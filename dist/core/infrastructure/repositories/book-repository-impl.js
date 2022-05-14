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
var book_repository_1 = __importDefault(require("../../domain-entities/repositories/book-repository"));
var BookRepositoryImpl = /** @class */ (function (_super) {
    __extends(BookRepositoryImpl, _super);
    function BookRepositoryImpl(database) {
        var _this = _super.call(this) || this;
        _this.database = database;
        return _this;
    }
    BookRepositoryImpl.prototype.findAll = function () {
        return this.database.queryAll(this.entityName);
    };
    BookRepositoryImpl.prototype.findOneById = function (id) {
        return this.database.queryOneByFilterFunction(this.entityName, function (entity) { return entity.getPrimaryKey() === id; });
    };
    BookRepositoryImpl.prototype.save = function (entity) {
        return this.database.save(this.entityName, entity);
    };
    BookRepositoryImpl.prototype.delete = function (entity) {
        return this.database.delete(this.entityName, entity);
    };
    return BookRepositoryImpl;
}(book_repository_1.default));
exports.default = BookRepositoryImpl;
