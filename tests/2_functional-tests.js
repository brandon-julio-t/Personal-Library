/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  const url = "/api/books";

  suite("Routing tests", function () {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        test("Test POST /api/books with title", function (done) {
          chai
            .request(server)
            .post(url)
            .send({ title: "title" })
            .end((err, res) => {
              assert.strictEqual(res.status, 200);

              const book = res.body;
              assert.isObject(book);
              assert.isString(book._id);
              assert.isNotEmpty(book._id);
              assert.strictEqual(book.title, "title");
              done();
            });
        });

        test("Test POST /api/books with no title given", function (done) {
          chai
            .request(server)
            .post(url)
            .send({})
            .end((err, res) => {
              assert.strictEqual(res.status, 200);
              assert.strictEqual(res.text, "missing required field title");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get(url)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.isArray(res.body);
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai
          .request(server)
          .get(`${url}/_id`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "no book exists");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .post(url)
          .send({ title: "title" })
          .end((err, res) => {
            const book = res.body;

            chai
              .request(server)
              .get(`${url}/${res.body._id}`)
              .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.isObject(res.body);
                assert.deepNestedInclude(res.body, book);
                assert.isNumber(res.body.commentcount);
                assert.isArray(res.body.comments);
                done();
              });
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function () {
        test("Test POST /api/books/[id] with comment", function (done) {
          chai
            .request(server)
            .post(url)
            .send({ title: "title" })
            .end((err, res) => {
              const book = res.body;

              chai
                .request(server)
                .post(`${url}/${book._id}`)
                .send({ comment: "comment" })
                .end((err, res) => {
                  assert.strictEqual(res.status, 200);

                  const book = res.body;
                  assert.isObject(book);
                  assert.isArray(book.comments);
                  assert.strictEqual(book.comments.length, 1);
                  assert.strictEqual(book.comments[0], "comment");

                  done();
                });
            });
        });

        test("Test POST /api/books/[id] without comment field", function (done) {
          chai
            .request(server)
            .post(url)
            .send({ title: "title" })
            .end((err, res) => {
              const book = res.body;

              chai
                .request(server)
                .post(`${url}/${book._id}`)
                .send({})
                .end((err, res) => {
                  assert.strictEqual(res.status, 200);
                  assert.strictEqual(
                    res.text,
                    "missing required field comment"
                  );

                  done();
                });
            });
        });

        test("Test POST /api/books/[id] with comment, id not in db", function (done) {
          chai
            .request(server)
            .post(`${url}/_id`)
            .send({ comment: "comment" })
            .end((err, res) => {
              assert.strictEqual(res.status, 200);
              assert.strictEqual(res.text, "no book exists");

              done();
            });
        });
      }
    );

    suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .post(url)
          .send({ title: "title" })
          .end((err, res) => {
            const book = res.body;

            chai
              .request(server)
              .delete(`${url}/${book._id}`)
              .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.text, "delete successful");
                done();
              });
          });
      });

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai
          .request(server)
          .delete(`${url}/_id`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "no book exists");
            done();
          });
      });
    });

    suite("DELETE /api/books => delete all books", function () {
      test("Test DELETE /api/book", (done) => {
        chai
          .request(server)
          .delete(url)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "complete delete successful");
            done();
          });
      });
    });
  });
});
