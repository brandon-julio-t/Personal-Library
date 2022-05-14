import BookRepository from "../../domain-entities/repositories/book-repository";
import Book from "../../domain-entities/models/book";
import Database from "../databases/database";

export default class BookRepositoryImpl extends BookRepository {
  constructor(private database: Database) {
    super();
  }

  findAll(): Book[] {
    return this.database.queryAll(this.entityName);
  }

  findOneById(id: string): Book {
    return this.database.queryOneByFilterFunction(
      this.entityName,
      (entity) => entity.getPrimaryKey() === id
    );
  }

  save(entity: Book): Book {
    return this.database.save(this.entityName, entity);
  }

  delete(entity: Book): Book {
    return this.database.delete(this.entityName, entity);
  }
}
