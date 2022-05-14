import Book from "../../models/book";
import Factory from "../../../application/contracts/common/factory";
import BookFactoryInput from "./book-factory-input";

export default abstract class BookFactory
  implements Factory<BookFactoryInput, Book>
{
  abstract create(data: BookFactoryInput): Book;
}
