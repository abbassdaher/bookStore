const express = require("express");
const Joi = require("joi");
const router = express.Router();

const books = [
  {
    id: 1,
    title: "book-1",
    author: "abbass",
    description: "about book-1",
    price: 10,
    cover: "soft cover",
  },
  {
    id: 2,
    title: "book-2",
    author: "nadine",
    description: "about book-2",
    price: 10,
    cover: "soft cover",
  },
  {
    id: 3,
    title: "book-3",
    author: "houssen",
    description: "about book-3",
    price: 10,
    cover: "soft cover",
  },
  {
    id: 4,
    title: "book-4",
    author: "mahdi",
    description: "about book-4",
    price: 10,
    cover: "soft cover",
  },
];
// init app

/**
 * @desc get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc get books by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id == parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * @desc add new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {
  const { error } = validationCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * @desc update book by id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */

router.put("/:id", (req, res) => {
  const { error } = validationUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = books.find((b) => b.id == parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  } else {
    return res.status(200).json({ message: "book update sccesfully" });
  }
});

/**
 * @desc delete book by id
 * @route /api/books/:id
 * @method Delete
 * @access public
 */

router.delete("/:id", (req, res) => {
  const book = books.find((b) => b.id == parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  } else {
    const index = books.indexOf(book);
    books.splice(index, 1);
    return res.status(200).json({ message: "book deleted successfully" });
  }
});

function validationCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(30).required(),
    author: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(10).max(200).required(),
    price: Joi.number().min(1).required(),
    cover: Joi.string().min(4).max(30).required(),
  });
  return schema.validate(obj);
}

function validationUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(30),
    author: Joi.string().min(4).max(30),
    description: Joi.string().min(10).max(200),
    price: Joi.number().min(1),
    cover: Joi.string().min(4).max(30),
  });
  return schema.validate(obj);
}
module.exports = router;
