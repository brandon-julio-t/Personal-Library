import BookDTO from "../../../domain-entities/dtos/book-dto";
import BookDTOFactory from "../../../domain-entities/factories/book-dto-factory/book-dto-factory";
import BookRepository from "../../../domain-entities/repositories/book-repository";
import CommentRepository from "../../../domain-entities/repositories/comment-repository";
import Interactor from "../../contracts/common/interactor";
import GetOneBookInteractorInput from "./get-one-book-interactor-input";

export default class GetOneBookInteractor extends Interactor<
  GetOneBookInteractorInput,
  BookDTO
> {
  constructor(
    private bookRepository: BookRepository,
    private bookDtoFactory: BookDTOFactory,
    private commentRepository: CommentRepository
  ) {
    super();
  }

  execute(payload: GetOneBookInteractorInput): BookDTO {
    const { bookId } = payload;

    const book = this.bookRepository.findOneById(bookId);
    if (!book) throw new Error("no book exists");

    return this.bookDtoFactory.create({
      book,
      comments: this.commentRepository.findAllByBook(book),
    });
  }
}
