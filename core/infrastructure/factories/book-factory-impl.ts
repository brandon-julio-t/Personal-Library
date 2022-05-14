import { v4 } from "uuid";
import BookFactory from "../../domain-entities/factories/book-factory/book-factory";
import BookFactoryInput from "../../domain-entities/factories/book-factory/book-factory-input";
import Book from "../../domain-entities/models/book";

export default class BookFactoryImpl extends BookFactory {
  create(data: BookFactoryInput): Book {
    const entity = new Book();
    Object.assign(entity, data);
    entity.setPrimaryKey(entity.getPrimaryKey() || v4());
    return entity;
  }
}
