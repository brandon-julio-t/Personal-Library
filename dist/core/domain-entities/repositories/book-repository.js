"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookRepository = /** @class */ (function () {
    function BookRepository() {
    }
    Object.defineProperty(BookRepository.prototype, "entityName", {
        get: function () {
            return "book";
        },
        enumerable: false,
        configurable: true
    });
    return BookRepository;
}());
exports.default = BookRepository;
