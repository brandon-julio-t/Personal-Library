"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var interactor_1 = __importDefault(require("../../contracts/common/interactor"));
var CreateCommentInteractor = /** @class */ (function (_super) {
    __extends(CreateCommentInteractor, _super);
    function CreateCommentInteractor(validation, bookRepository, bookDtoFactory, commentRepository, commentFactory) {
        var _this = _super.call(this) || this;
        _this.validation = validation;
        _this.bookRepository = bookRepository;
        _this.bookDtoFactory = bookDtoFactory;
        _this.commentRepository = commentRepository;
        _this.commentFactory = commentFactory;
        return _this;
    }
    CreateCommentInteractor.prototype.execute = function (payload) {
        var bookId = payload.bookId, comment = payload.comment;
        this.validation.validate({ comment: comment });
        var book = this.bookRepository.findOneById(bookId);
        if (!book)
            throw new Error("no book exists");
        var commentEntity = this.commentFactory.create({
            bookId: book.getPrimaryKey(),
            body: comment,
        });
        this.commentRepository.save(commentEntity);
        var comments = this.commentRepository.findAllByBook(book);
        return this.bookDtoFactory.create({ book: book, comments: comments });
    };
    return CreateCommentInteractor;
}(interactor_1.default));
exports.default = CreateCommentInteractor;
