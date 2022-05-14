import BookDTO from "../../../domain-entities/dtos/book-dto";
import BookDTOFactory from "../../../domain-entities/factories/book-dto-factory/book-dto-factory";
import CommentFactory from "../../../domain-entities/factories/comment-factory/comment-factory";
import BookRepository from "../../../domain-entities/repositories/book-repository";
import CommentRepository from "../../../domain-entities/repositories/comment-repository";
import Interactor from "../../contracts/common/interactor";
import CreateCommentValidation from "../../validations/create-comment/create-comment-validation";
import CreateCommentInteractorInput from "./create-comment-interactor-input";

export default class CreateCommentInteractor extends Interactor<
  CreateCommentInteractorInput,
  BookDTO
> {
  constructor(
    private validation: CreateCommentValidation,
    private bookRepository: BookRepository,
    private bookDtoFactory: BookDTOFactory,
    private commentRepository: CommentRepository,
    private commentFactory: CommentFactory
  ) {
    super();
  }

  execute(payload: CreateCommentInteractorInput): BookDTO {
    const { bookId, comment } = payload;

    this.validation.validate({ comment });

    const book = this.bookRepository.findOneById(bookId);
    if (!book) throw new Error("no book exists");

    const commentEntity = this.commentFactory.create({
      bookId: book.getPrimaryKey(),
      body: comment,
    });
    this.commentRepository.save(commentEntity);

    const comments = this.commentRepository.findAllByBook(book);

    return this.bookDtoFactory.create({ book, comments });
  }
}
