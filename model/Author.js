const mongoose = require("mongoose");
const joi = require("joi");
const { types, string, required } = require("joi");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 25,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 25,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  { timestamps: true }
);
// validation add nrew author
function validationAddAuthor(obj) {
  const schema = joi.object({
    firstName: joi.string().min(5).max(25).required(),
    lastName: joi.string().min(3).max(25).required(),
    nationality: joi.string().min(5).max(25).required(),
  });
  return schema.validate();
}

// validation update author
function validateUpdateAuthor(obj) {
  const schema = joi.object({
    firstName: joi.string().min(5).max(25),
    lastName: joi.string().min(3).max(25),
    nationality: joi.string().min(5).max(25),
  });
  return schema.validate();
}

const Author = mongoose.model("Author", AuthorSchema);

module.exports = { Author, validateUpdateAuthor, validationAddAuthor };
