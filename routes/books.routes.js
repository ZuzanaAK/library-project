const express = require('express');
const router  = express.Router();
const Book = require('../models/Book.model');


router.get('/books', (req, res, next) => {
  Book.find()
    .then( (books) => {
      console.log(books);
      res.render('books-list', {books});
    })
    .catch(err => {console.log(`Error: ${err}`)});
});

router.get('/books/create', (req, res) => {
  res.render('book-create');
});



router.post('/books/create', (req, res) => {
  Book.create(req.body).then(bookDetails => {
    // console.log("Yes, we saved your book in the DB !! ");
    res.redirect('/books');

  }).catch(err => {
    console.log(err);
  });
});


router.get('/books/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render('book-details', {book});
    })
    .catch(err => {console.log(`Error: ${err}`)});
});


router.get('/books/:bookId/edit', (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render('book-edit', book);
    })
    .catch(err => {console.log(`Error: ${err}`)});
});

router.post('/books/:bookId/edit', (req, res, next) => {
  Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true })
    .then(bookDetails => {
      res.redirect(`/books/${bookDetails._id}`);
    })
    .catch(err => {console.log(`Error: ${err}`)});
});

router.post('/books/:bookId/delete', (req, res, next) => {
  Book.findByIdAndDelete(req.params.bookId)
  .then( () => {
    res.redirect("/books")
  })
  .catch(err => {console.log(`Error: ${err}`)});
});

module.exports = router;