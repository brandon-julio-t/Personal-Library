"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookDTO = /** @class */ (function () {
    function BookDTO(_id, title, comments, commentcount) {
        if (_id === void 0) { _id = ""; }
        if (title === void 0) { title = ""; }
        if (comments === void 0) { comments = []; }
        if (commentcount === void 0) { commentcount = 0; }
        this._id = _id;
        this.title = title;
        this.comments = comments;
        this.commentcount = commentcount;
    }
    return BookDTO;
}());
exports.default = BookDTO;
