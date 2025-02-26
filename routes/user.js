const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  User,
  validationRegistrationUser,
  validationUpdateUser,
} = require("../model/User");

/**
 * @desc get all user
 * @route /api/users
 * @method get
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  })
);

/**
 * @desc get user by id
 * @route /api/users/:id
 * @method GET
 * @access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  })
);



module.exports = router;
