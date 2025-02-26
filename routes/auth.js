const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validationRegistrationUser,
  validationUpdateRegistrationUser,
  validationLoginUser
} = require("../model/User");

/**
 * @desc create new user
 * @route /api/auths
 * @method POST
 * @access public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
          const error = validationRegistrationUser(req.body);
          if (error)
                    {return res.status(400).json({ message: error.details[0].message });}

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    
    

    const result = await user.save();
    const token = null;
    const { password, ...other } = result._doc;

    res.status(201).json({ ...other, token });
  })
);

/**
 * @desc login user
 * @route /api/login
 * @method POST
 * @access public
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
          const error = validationLoginUser(req.body);
          if (error)
                    {return res.status(400).json({ message: error.details[0].message });}
          
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch){
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = null;
    const { password, ...other } = user._doc;

    res.status(201).json({ ...other, token });
  })
);

/**
 * @desc update user by id
 * @route /api/auths
 * @method PUT
 * @access public
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
          
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

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

    const error = validationRegistrationUser(user);
    if (error)
      return res.status(500).json({ message: error.details[0].message });

    const token = null;
    const { password, ...other } = user._doc;
    //     if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ ...other, token });
  })
);

module.exports = router;
