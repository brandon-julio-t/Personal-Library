import BookDTOFactory from "../domain-entities/factories/book-dto-factory/book-dto-factory";
import BookFactory from "../domain-entities/factories/book-factory/book-factory";
import CommentFactory from "../domain-entities/factories/comment-factory/comment-factory";
import BookRepository from "../domain-entities/repositories/book-repository";
import CommentRepository from "../domain-entities/repositories/comment-repository";
import InMemoryDatabase from "../infrastructure/databases/in-memory-database";
import BookDTOFactoryImpl from "../infrastructure/factories/book-dto-factory-impl";
import BookFactoryImpl from "../infrastructure/factories/book-factory-impl";
import CommentFactoryImpl from "../infrastructure/factories/comment-factory-impl";
import BookRepositoryImpl from "../infrastructure/repositories/book-repository-impl";
import CommentRepositoryImpl from "../infrastructure/repositories/comment-repository-impl";

export default class ServiceContainer {
  private container = new Map<any, any>();

  constructor() {
    const database = new InMemoryDatabase();

    this.container.set(BookRepository, new BookRepositoryImpl(database));
    this.container.set(BookFactory, new BookFactoryImpl());
    this.container.set(BookDTOFactory, new BookDTOFactoryImpl());
    this.container.set(CommentRepository, new CommentRepositoryImpl(database));
    this.container.set(CommentFactory, new CommentFactoryImpl());

    this.seed();
  }

  public getService<T>(component: any): T {
    return this.container.get(component) as T;
  }

  private seed() {
    const bookFactory = this.getService<BookFactory>(BookFactory);
    const bookRepository = this.getService<BookRepository>(BookRepository);
    const commentFactory = this.getService<CommentFactory>(CommentFactory);
    const commentRepository = this.getService<CommentRepository>(CommentRepository);

    const book = bookFactory.create({ title: "book 1" });
    const comment = commentFactory.create({
      body: "comment 1",
      bookId: book.getPrimaryKey(),
    });

    bookRepository.save(book);
    commentRepository.save(comment);
  }
}
