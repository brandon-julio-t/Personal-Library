"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
    }
    Model.prototype.getPrimaryKey = function () {
        var model = this;
        return model[this.getPrimaryKeyName()];
    };
    Model.prototype.setPrimaryKey = function (value) {
        var model = this;
        model[this.getPrimaryKeyName()] = value;
        Object.assign(this, model);
    };
    return Model;
}());
exports.default = Model;
