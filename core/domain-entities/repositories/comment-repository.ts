import Repository from "../contracts/repository";
import Book from "../models/book";
import Comment from "../models/comment";

export default abstract class CommentRepository implements Repository<Comment> {
  get entityName(): string {
    return "comment";
  }

  abstract findAll(): Comment[];
  abstract findAllByBook(book: Book): Comment[];
  abstract save(entity: Comment): Comment;
  abstract delete(entity: Comment): Comment;
}

