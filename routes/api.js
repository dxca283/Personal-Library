/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

module.exports = function (app) {
  let books = [];
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const bookList = books.map((b) => ({
        _id: b._id,
        title: b.title,
        commentcount: b.comments.length,
      }));
      return res.json(bookList);
    })

    .post(function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) return res.send("missing required field title");

      const newBook = {
        _id: Date.now().toString(),
        title,
        comments: [],
      };
      books.push(newBook);
      return res.json({ _id: newBook._id, title: newBook.title });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      books = [];
      return res.send('complete delete successful');
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = books.find((b) => b._id === bookid);
      if (!book) return res.send('no book exists');
      return res.json(book);
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.send('missing required field comment');

      const book = books.find((b) => b._id === bookid);
      if (!book) return res.send('no book exists');

      book.comments.push(comment);
      return res.json(book);
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const index = books.findIndex((b) => b._id === bookid);
      if (index === -1) return res.send('no book exists');
      books.splice(index, 1);
      return res.send('delete successful');
    });
};
