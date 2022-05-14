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
var book_dto_1 = __importDefault(require("../../domain-entities/dtos/book-dto"));
var book_dto_factory_1 = __importDefault(require("../../domain-entities/factories/book-dto-factory/book-dto-factory"));
var BookDTOFactoryImpl = /** @class */ (function (_super) {
    __extends(BookDTOFactoryImpl, _super);
    function BookDTOFactoryImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookDTOFactoryImpl.prototype.create = function (data) {
        var book = data.book, comments = data.comments;
        var dto = new book_dto_1.default();
        Object.assign(dto, book);
        dto.comments = comments.map(function (x) { return x.body; });
        dto.commentcount = comments.length;
        return dto;
    };
    return BookDTOFactoryImpl;
}(book_dto_factory_1.default));
exports.default = BookDTOFactoryImpl;
