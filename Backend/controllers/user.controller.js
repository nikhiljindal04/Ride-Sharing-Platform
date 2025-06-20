const userModel = require("../db/Models/User.models.js");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;
  const hashedPassword = await userModel.hashPassword(password);

  console.log(req.body);

  const user = await userService.createUser({
    fullName: { firstName, lastName },
    email,
    password: hashedPassword,
  });

  const token = await user.generateAuthToken();
  res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if user exists
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = await user.generateAuthToken();

  // Set the token in a cookie
  res.cookie("token", token);

  res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};
