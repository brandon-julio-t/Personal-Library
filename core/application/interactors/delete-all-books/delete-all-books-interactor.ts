import BookRepository from "../../../domain-entities/repositories/book-repository";
import Interactor from "../../contracts/common/interactor";

export default class DeleteAllBooksInteractor extends Interactor<{}, string> {
  constructor(private bookRepository: BookRepository) {
    super();
  }

  execute(_: {}): string {
    this.bookRepository
      .findAll()
      .forEach((book) => this.bookRepository.delete(book));
    return "complete delete successful";
  }
}
