const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  Book,
  validationCreateBook,
  validationUpdateBook,
} = require("../model/Book");

// const books = [
//   {
//     id: 1,
//     title: "book-1",
//     author: "abbass",
//     description: "about book-1",
//     price: 10,
//     cover: "soft cover",
//   },
//   {
//     id: 2,
//     title: "book-2",
//     author: "nadine",
//     description: "about book-2",
//     price: 10,
//     cover: "soft cover",
//   },
//   {
//     id: 3,
//     title: "book-3",
//     author: "houssen",
//     description: "about book-3",
//     price: 10,
//     cover: "soft cover",
//   },
//   {
//     id: 4,
//     title: "book-4",
//     author: "mahdi",
//     description: "about book-4",
//     price: 10,
//     cover: "soft cover",
//   },
// ];
// init app

/**
 * @desc get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const book = await await Book.find()
      .select("title")
      .populate("author", ["_id", "firstName"]);
    res.status(200).json(book);
  })
);

/**
 * @desc get books by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  })
);

/**
 * @desc add new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = validationCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await book.save();
    res.status(201).json(result);
  })
);

/**
 * @desc update book by id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { error } = validationUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title || book.title,
          author: req.body.author || book.author,
          description: req.body.description || book.description,
          price: req.body.price || book.price,
          cover: req.body.cover || book.cover,
        },
      },
      { new: true }
    );
    return res.status(200).json(book);
  })
);

/**
 * @desc delete book by id
 * @route /api/books/:id
 * @method Delete
 * @access public
 */

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      await Book.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "book deleted successfully" });
    }
  })
);

module.exports = router;
