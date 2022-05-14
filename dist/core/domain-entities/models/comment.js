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
var model_1 = __importDefault(require("../contracts/model"));
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment(_id, body, bookId) {
        if (_id === void 0) { _id = ""; }
        if (body === void 0) { body = ""; }
        if (bookId === void 0) { bookId = ""; }
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this.body = body;
        _this.bookId = bookId;
        return _this;
    }
    Comment.prototype.getPrimaryKeyName = function () {
        return "_id";
    };
    return Comment;
}(model_1.default));
exports.default = Comment;
