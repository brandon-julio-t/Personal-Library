import book from "../../domain-entities/models/book";
import Comment from "../../domain-entities/models/comment";
import CommentRepository from "../../domain-entities/repositories/comment-repository";
import Database from "../databases/database";

export default class CommentRepositoryImpl extends CommentRepository {
  constructor(private database: Database) {
    super();
  }

  findAll(): Comment[] {
    return this.database.queryAll(this.entityName);
  }

  findAllByBook(book: book): Comment[] {
    return this.database.queryAllByFilterFunction(
      this.entityName,
      (comment) => {
        if (!(comment instanceof Comment)) return false;
        return comment.bookId === book.getPrimaryKey();
      }
    );
  }

  save(entity: Comment): Comment {
    return this.database.save(this.entityName, entity);
  }

  delete(entity: Comment): Comment {
    return this.database.delete(this.entityName, entity);
  }
}
