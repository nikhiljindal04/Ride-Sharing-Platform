const userModel = require("../db/Models/User.models.js");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const blacklistToken = require("../db/Models/blacklistToken.model");

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

  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    fullName: { firstName, lastName },
    email,
    password: hashedPassword,
  });

  const token = await user.generateAuthToken();

  // Set the token in a cookie
  res.cookie("token", token);
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
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = await user.generateAuthToken();

  // Set the token in a cookie
  res.cookie("token", token);
  user.password = undefined;
  res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get the token from the cookie
  try {
    await blacklistToken.create({ token });
    res.clearCookie("token"); // Clear the token cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error logging out:", error);
    res.status(500).json({ message: "Error logging out" });
  }
};
