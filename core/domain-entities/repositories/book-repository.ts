import Repository from "../contracts/repository";
import Book from "../models/book";

export default abstract class BookRepository implements Repository<Book> {
  get entityName(): string {
    return "book";
  }

  abstract findAll(): Book[];
  abstract findOneById(id: string): Book;
  abstract save(entity: Book): Book;
  abstract delete(entity: Book): Book;
}
