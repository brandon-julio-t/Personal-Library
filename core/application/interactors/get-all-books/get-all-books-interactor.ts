import BookDTO from "../../../domain-entities/dtos/book-dto";
import BookDTOFactory from "../../../domain-entities/factories/book-dto-factory/book-dto-factory";
import BookRepository from "../../../domain-entities/repositories/book-repository";
import CommentRepository from "../../../domain-entities/repositories/comment-repository";
import Interactor from "../../contracts/common/interactor";

export default class GetAllBooksInteractor extends Interactor<any, BookDTO[]> {
  constructor(
    private bookRepository: BookRepository,
    private bookDtoFactory: BookDTOFactory,
    private commentRepository: CommentRepository
  ) {
    super();
  }

  execute(_: any): BookDTO[] {
    return this.bookRepository
      .findAll()
      .map((book) =>
        this.bookDtoFactory.create({
          book,
          comments: this.commentRepository.findAllByBook(book),
        })
      );
  }
}
