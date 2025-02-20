const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 25,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
      //     match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

// function to validate user data
function validationRegistrationUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(5).max(25).required(),
    email: joi.string().trim().min(5).max(255).required(),
    password: joi.string().trim().min(5).max(25).required(),
    isAdmin: joi.boolean(),
  });
}

function validationUpdateUser(object) {
  const schema = joi.object({
    username: joi.string().trim().min(5).max(25),
    password: joi.string().trim().min(5).max(25),
    email: joi.string().trim().min(5).max(255),
    isAdmin: joi.boolean(),
  });
}

module.exports = { User, validationRegistrationUser, validationUpdateUser };