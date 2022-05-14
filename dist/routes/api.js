/*
 *
 *
 *       Complete the API routing below
 *
 *
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var book_factory_1 = __importDefault(require("../core/domain-entities/factories/book-factory/book-factory"));
var book_repository_1 = __importDefault(require("../core/domain-entities/repositories/book-repository"));
var create_book_interactor_1 = __importDefault(require("../core/application/interactors/create-book/create-book-interactor"));
var create_book_validation_1 = __importDefault(require("../core/application/validations/create-book/create-book-validation"));
var service_container_1 = __importDefault(require("../core/facades/service-container"));
var get_all_books_interactor_1 = __importDefault(require("../core/application/interactors/get-all-books/get-all-books-interactor"));
var comment_repository_1 = __importDefault(require("../core/domain-entities/repositories/comment-repository"));
var get_one_book_interactor_1 = __importDefault(require("../core/application/interactors/get-one-book/get-one-book-interactor"));
var create_comment_interactor_1 = __importDefault(require("../core/application/interactors/create-comment/create-comment-interactor"));
var book_dto_factory_1 = __importDefault(require("../core/domain-entities/factories/book-dto-factory/book-dto-factory"));
var comment_factory_1 = __importDefault(require("../core/domain-entities/factories/comment-factory/comment-factory"));
var create_comment_validation_1 = __importDefault(require("../core/application/validations/create-comment/create-comment-validation"));
var delete_book_interactor_1 = __importDefault(require("../core/application/interactors/delete-book/delete-book-interactor"));
var delete_all_books_interactor_1 = __importDefault(require("../core/application/interactors/delete-all-books/delete-all-books-interactor"));
var serviceContainer = new service_container_1.default();
module.exports = function (app) {
    app
        .route("/api/books")
        .get(function (_, res) {
        //response will be array of book objects
        //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        var response = new get_all_books_interactor_1.default(serviceContainer.getService(book_repository_1.default), serviceContainer.getService(book_dto_factory_1.default), serviceContainer.getService(comment_repository_1.default)).execute({});
        return res.json(response);
    })
        .post(function (req, res) {
        try {
            var title = req.body.title;
            //response will contain new book object including atleast _id and title
            var response = new create_book_interactor_1.default(new create_book_validation_1.default(), serviceContainer.getService(book_repository_1.default), serviceContainer.getService(book_factory_1.default), serviceContainer.getService(book_dto_factory_1.default)).execute({ title: title });
            res.json(response);
        }
        catch (error) {
            var err = error;
            res.send(err.message);
        }
    })
        .delete(function (_, res) {
        //if successful response will be 'complete delete successful'
        var response = new delete_all_books_interactor_1.default(serviceContainer.getService(book_repository_1.default)).execute({});
        res.send(response);
    });
    app
        .route("/api/books/:id")
        .get(function (req, res) {
        try {
            var bookid = req.params.id;
            //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
            var response = new get_one_book_interactor_1.default(serviceContainer.getService(book_repository_1.default), serviceContainer.getService(book_dto_factory_1.default), serviceContainer.getService(comment_repository_1.default)).execute({ bookId: bookid });
            res.json(response);
        }
        catch (error) {
            var err = error;
            res.send(err.message);
        }
    })
        .post(function (req, res) {
        try {
            var bookid = req.params.id;
            var comment = req.body.comment;
            //json res format same as .get
            var response = new create_comment_interactor_1.default(new create_comment_validation_1.default(), serviceContainer.getService(book_repository_1.default), serviceContainer.getService(book_dto_factory_1.default), serviceContainer.getService(comment_repository_1.default), serviceContainer.getService(comment_factory_1.default)).execute({ bookId: bookid, comment: comment });
            res.json(response);
        }
        catch (error) {
            var err = error;
            res.send(err.message);
        }
    })
        .delete(function (req, res) {
        try {
            var bookid = req.params.id;
            //if successful response will be 'delete successful'
            var response = new delete_book_interactor_1.default(serviceContainer.getService(book_repository_1.default)).execute({ bookId: bookid });
            res.send(response);
        }
        catch (error) {
            var err = error;
            res.send(err.message);
        }
    });
};
