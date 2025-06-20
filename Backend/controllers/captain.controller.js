const captainModel = require("../db/Models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.services");
const blacklistToken = require("../db/Models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType },
  } = req.body;

  const isCaptainAlreadyExists = await captainModel.findOne({ email });
  if (isCaptainAlreadyExists) {
    return res.status(400).json({ error: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    fullName: { firstName, lastName },
    email,
    password: hashedPassword,
    vehicle: { color, plate, capacity, vehicleType },
  });

  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ captain, token });
};

module.exports.loginCaptain = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  console.log(email, password);
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await captain.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ captain, token });
};

module.exports.getCaptainProfile = async (req, res) => {
  const captain = req.captain;
  if (!captain) {
    return res.status(404).json({ error: "Captain not found" });
  }

  res.status(200).json({ captain });
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }
  
  try {
    await blacklistToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "1 Error logging out" });
  }
};
