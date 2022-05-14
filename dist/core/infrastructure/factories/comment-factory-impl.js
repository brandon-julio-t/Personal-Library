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
var uuid_1 = require("uuid");
var comment_factory_1 = __importDefault(require("../../domain-entities/factories/comment-factory/comment-factory"));
var comment_1 = __importDefault(require("../../domain-entities/models/comment"));
var CommentFactoryImpl = /** @class */ (function (_super) {
    __extends(CommentFactoryImpl, _super);
    function CommentFactoryImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentFactoryImpl.prototype.create = function (data) {
        var entity = new comment_1.default();
        Object.assign(entity, data);
        entity.setPrimaryKey(entity.getPrimaryKey() || (0, uuid_1.v4)());
        return entity;
    };
    return CommentFactoryImpl;
}(comment_factory_1.default));
exports.default = CommentFactoryImpl;
