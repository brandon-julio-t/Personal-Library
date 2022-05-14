import BookRepository from "../../../domain-entities/repositories/book-repository";
import Interactor from "../../contracts/common/interactor";
import DeleteBookInteractorInput from "./delete-book-interactor-input";

export default class DeleteBookInteractor extends Interactor<
  DeleteBookInteractorInput,
  string
> {
  constructor(private bookRepository: BookRepository) {
    super();
  }

  execute(payload: DeleteBookInteractorInput): string {
    const { bookId } = payload;

    const book = this.bookRepository.findOneById(bookId);
    if (!book) throw new Error("no book exists");

    this.bookRepository.delete(book);

    return "delete successful";
  }
}
