const mongoose = require("mongoose");
const Joi = require("joi");
const { Author } = require("./Author");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 4, maxlength: 30 },
  author: { type: mongoose.Schema.ObjectId, required: true, ref: Author },
  description: { type: String, required: true, minlength: 10, maxlength: 200 },
  price: { type: Number, required: true, minlength: 1 },
  cover: { type: String, required: true, enum: ["soft cover", "hard cover"] },
});

function validationCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(30).required(),
    author: Joi.string().required(),
    description: Joi.string().min(4).max(30).required(),
    price: Joi.number().min(1).required(),
    cover: Joi.string().valid("soft cover", "hard cover").required(),
  });
  return schema.validate(obj);
}

function validationUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(30),
    author: Joi.string().min(4).max(30),
    description: Joi.string().min(10).max(200),
    price: Joi.number().min(1),
    cover: Joi.string().valid("soft cover", "hard cover"),
  });
  return schema.validate(obj);
}
const Book = mongoose.model("Book", bookSchema);
module.exports = { Book, validationCreateBook, validationUpdateBook };
