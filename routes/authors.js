const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {
  Author,
  validateUpdateAuthor,
  validationAddAuthor,
} = require("../model/Author");

/**
 * @desc get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authorList = await Author.find()
      .sort({ firstName: 1 })
      .select("firstName lastName ");
    res.status(200).json(authorList);
    
  })
);

/**
 * @desc get authors by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    } else {
      res.status(200).json(author);
    }
    
  })
);

/**
 * @desc add authors
 * @route /api/author
 * @method POST
 * @access public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const author = new Author({
      // id: authors.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();
    res.status(201).json(result);
  })
);

/**
 * @desc update authors by id
 * @route /api/authors
 * @method put
 * @access public
 */

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(author);
  })
);

/**
 * @desc delete authors by id
 * @route /api/authors
 * @method DELETE
 * @access public
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    // const author = authors.find((a) => a.id == parseInt(req.params.id));
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    await Author.findByIdAndDelete(req.params.id);
    // const index = authors.indexOf(author);
    // authors.splice(index, 1);
    return res.status(200).json({ message: "author deleted successfully" });
  })
);

module.exports = router;
