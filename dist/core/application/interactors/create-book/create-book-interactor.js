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
var CreateBookInteractor = /** @class */ (function (_super) {
    __extends(CreateBookInteractor, _super);
    function CreateBookInteractor(validation, bookRepository, bookFactory, bookDtoFactory) {
        var _this = _super.call(this) || this;
        _this.validation = validation;
        _this.bookRepository = bookRepository;
        _this.bookFactory = bookFactory;
        _this.bookDtoFactory = bookDtoFactory;
        return _this;
    }
    CreateBookInteractor.prototype.execute = function (payload) {
        var title = payload.title;
        this.validation.validate({ title: title });
        var book = this.bookRepository.save(this.bookFactory.create({ title: title }));
        return this.bookDtoFactory.create({ book: book, comments: [] });
    };
    return CreateBookInteractor;
}(interactor_1.default));
exports.default = CreateBookInteractor;
