/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

import { Express } from "express";
import BookFactory from "../core/domain-entities/factories/book-factory/book-factory";
import BookRepository from "../core/domain-entities/repositories/book-repository";
import CreateBookInteractor from "../core/application/interactors/create-book/create-book-interactor";
import CreateBookValidation from "../core/application/validations/create-book/create-book-validation";
import ServiceContainer from "../core/facades/service-container";
import GetAllBooksInteractor from "../core/application/interactors/get-all-books/get-all-books-interactor";
import CommentRepository from "../core/domain-entities/repositories/comment-repository";
import GetOneBookInteractor from "../core/application/interactors/get-one-book/get-one-book-interactor";
import CreateCommentInteractor from "../core/application/interactors/create-comment/create-comment-interactor";
import BookDTOFactory from "../core/domain-entities/factories/book-dto-factory/book-dto-factory";
import CommentFactory from "../core/domain-entities/factories/comment-factory/comment-factory";
import CreateCommentValidation from "../core/application/validations/create-comment/create-comment-validation";
import DeleteBookInteractor from "../core/application/interactors/delete-book/delete-book-interactor";
import DeleteAllBooksInteractor from "../core/application/interactors/delete-all-books/delete-all-books-interactor";

const serviceContainer = new ServiceContainer();

module.exports = function (app: Express) {
  app
    .route("/api/books")
    .get(function (_, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const response = new GetAllBooksInteractor(
        serviceContainer.getService<BookRepository>(BookRepository),
        serviceContainer.getService<BookDTOFactory>(BookDTOFactory),
        serviceContainer.getService<CommentRepository>(CommentRepository)
      ).execute({});
      return res.json(response);
    })

    .post(function (req, res) {
      try {
        let title = req.body.title;
        //response will contain new book object including atleast _id and title

        const response = new CreateBookInteractor(
          new CreateBookValidation(),
          serviceContainer.getService<BookRepository>(BookRepository),
          serviceContainer.getService<BookFactory>(BookFactory),
          serviceContainer.getService<BookDTOFactory>(BookDTOFactory)
        ).execute({ title });

        res.json(response);
      } catch (error) {
        const err = error as Error;
        res.send(err.message);
      }
    })

    .delete(function (_, res) {
      //if successful response will be 'complete delete successful'
      const response = new DeleteAllBooksInteractor(
        serviceContainer.getService<BookRepository>(BookRepository)
      ).execute({});
      res.send(response);
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      try {
        let bookid = req.params.id;
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

        const response = new GetOneBookInteractor(
          serviceContainer.getService<BookRepository>(BookRepository),
          serviceContainer.getService<BookDTOFactory>(BookDTOFactory),
          serviceContainer.getService<CommentRepository>(CommentRepository)
        ).execute({ bookId: bookid });

        res.json(response);
      } catch (error) {
        const err = error as Error;
        res.send(err.message);
      }
    })

    .post(function (req, res) {
      try {
        let bookid = req.params.id;
        let comment = req.body.comment;
        //json res format same as .get

        const response = new CreateCommentInteractor(
          new CreateCommentValidation(),
          serviceContainer.getService<BookRepository>(BookRepository),
          serviceContainer.getService<BookDTOFactory>(BookDTOFactory),
          serviceContainer.getService<CommentRepository>(CommentRepository),
          serviceContainer.getService<CommentFactory>(CommentFactory)
        ).execute({ bookId: bookid, comment });

        res.json(response);
      } catch (error) {
        const err = error as Error;
        res.send(err.message);
      }
    })

    .delete(function (req, res) {
      try {
        let bookid = req.params.id;
        //if successful response will be 'delete successful'

        const response = new DeleteBookInteractor(
          serviceContainer.getService<BookRepository>(BookRepository)
        ).execute({ bookId: bookid });

        res.send(response);
      } catch (error) {
        const err = error as Error;
        res.send(err.message);
      }
    });
};
