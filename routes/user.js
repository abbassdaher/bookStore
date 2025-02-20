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
/**
 * @desc create new user
 * @route /api/users
 * @method POST
 * @access public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    const error = validationRegistrationUser(user);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const result = await user.save();
    res.status(201).json(result);
  })
);
/**
 * @desc update user by id
 * @route /api/users
 * @method PUT
 * @access public
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        },
      },
      { new: true }
    );
    //     if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  })
);

module.exports = router;
