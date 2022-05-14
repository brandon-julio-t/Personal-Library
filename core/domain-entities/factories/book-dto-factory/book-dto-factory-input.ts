import Book from "../../models/book";
import Comment from "../../models/comment";

export default interface BookDTOFactoryInput {
  book: Book;
  comments: Comment[];
}
