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
var database_1 = __importDefault(require("./database"));
var InMemoryDatabase = /** @class */ (function (_super) {
    __extends(InMemoryDatabase, _super);
    function InMemoryDatabase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.database = new Map();
        return _this;
    }
    InMemoryDatabase.prototype.getDataArray = function (entityName) {
        var data = this.database.get(entityName);
        if (!data) {
            data = [];
            this.database.set(entityName, data);
        }
        return data;
    };
    InMemoryDatabase.prototype.queryAll = function (entityName) {
        return this.getDataArray(entityName);
    };
    InMemoryDatabase.prototype.queryAllByFilterFunction = function (entityName, filterFn) {
        return this.getDataArray(entityName).filter(filterFn);
    };
    InMemoryDatabase.prototype.queryOneByFilterFunction = function (entityName, filterFn) {
        return this.getDataArray(entityName).find(filterFn);
    };
    InMemoryDatabase.prototype.save = function (entityName, entity) {
        var data = this.getDataArray(entityName);
        data.push(entity);
        return entity;
    };
    InMemoryDatabase.prototype.delete = function (entityName, entity) {
        var data = this.getDataArray(entityName);
        var idx = data.findIndex(function (d) { return d.getPrimaryKey() === entity.getPrimaryKey(); });
        data.splice(idx, 1);
        return entity;
    };
    return InMemoryDatabase;
}(database_1.default));
exports.default = InMemoryDatabase;
