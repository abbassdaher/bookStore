const express = require("express");
const router = express.Router();
const joi = require("joi");
let authors = [
  { id: 1, firstName: "abbass", lastName: "daher", nationality: "lebanon" },
];

/**
 * @desc get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(authors);
});

/**
 * @desc get authors by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id == parseInt(req.params.id));
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  } else {
    res.status(200).json(author);
  }
});

/**
 * @desc add authors
 * @route /api/authors
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {
  const { error } = validationAddAuthor(req.body);
  const newAuthor = {
    id: authors.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
  };
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  }
});

/**
 * @desc update authors by id
 * @route /api/authors
 * @method put
 * @access public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const author = authors.find((a) => a.id == parseInt(req.params.id));
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  } else {
    author.firstName = req.body.firstName;
    author.lastName = req.body.lastName;
    author.nationality = req.body.nationality;
    res.status(200).json({ message: "Author updated successfully" });
  }
});

/**
 * @desc delete authors by id
 * @route /api/authors
 * @method DELETE
 * @access public
 */
router.delete("/:id", (req, res) => {
  const author = authors.find((a) => a.id == parseInt(req.params.id));
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  const index = authors.indexOf(author);
  authors.splice(index, 1);
  return res.status(200).json({ message: "author deleted successfully" });
});

// validation add nrew author
function validationAddAuthor(obj) {
  const schema = joi.object({
    firstName: joi.string().min(4).max(30).required(),
    lastName: joi.string().min(4).max(30).required(),
    nationality: joi.string().min(4).max(30).required(),
  });
  return schema.validate();
}

// validation update author
function validateUpdateAuthor(obj) {
  const schema = joi.object({
    firstName: joi.string().min(4).max(30),
    lastName: joi.string().min(4).max(30),
    nationality: joi.string().min(4).max(30),
  });
  return schema.validate();
}

module.exports = router;
