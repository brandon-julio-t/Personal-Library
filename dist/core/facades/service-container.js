"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var book_dto_factory_1 = __importDefault(require("../domain-entities/factories/book-dto-factory/book-dto-factory"));
var book_factory_1 = __importDefault(require("../domain-entities/factories/book-factory/book-factory"));
var comment_factory_1 = __importDefault(require("../domain-entities/factories/comment-factory/comment-factory"));
var book_repository_1 = __importDefault(require("../domain-entities/repositories/book-repository"));
var comment_repository_1 = __importDefault(require("../domain-entities/repositories/comment-repository"));
var in_memory_database_1 = __importDefault(require("../infrastructure/databases/in-memory-database"));
var book_dto_factory_impl_1 = __importDefault(require("../infrastructure/factories/book-dto-factory-impl"));
var book_factory_impl_1 = __importDefault(require("../infrastructure/factories/book-factory-impl"));
var comment_factory_impl_1 = __importDefault(require("../infrastructure/factories/comment-factory-impl"));
var book_repository_impl_1 = __importDefault(require("../infrastructure/repositories/book-repository-impl"));
var comment_repository_impl_1 = __importDefault(require("../infrastructure/repositories/comment-repository-impl"));
var ServiceContainer = /** @class */ (function () {
    function ServiceContainer() {
        this.container = new Map();
        var database = new in_memory_database_1.default();
        this.container.set(book_repository_1.default, new book_repository_impl_1.default(database));
        this.container.set(book_factory_1.default, new book_factory_impl_1.default());
        this.container.set(book_dto_factory_1.default, new book_dto_factory_impl_1.default());
        this.container.set(comment_repository_1.default, new comment_repository_impl_1.default(database));
        this.container.set(comment_factory_1.default, new comment_factory_impl_1.default());
        this.seed();
    }
    ServiceContainer.prototype.getService = function (component) {
        return this.container.get(component);
    };
    ServiceContainer.prototype.seed = function () {
        var bookFactory = this.getService(book_factory_1.default);
        var bookRepository = this.getService(book_repository_1.default);
        var commentFactory = this.getService(comment_factory_1.default);
        var commentRepository = this.getService(comment_repository_1.default);
        var book = bookFactory.create({ title: "book 1" });
        var comment = commentFactory.create({
            body: "comment 1",
            bookId: book.getPrimaryKey(),
        });
        bookRepository.save(book);
        commentRepository.save(comment);
    };
    return ServiceContainer;
}());
exports.default = ServiceContainer;
