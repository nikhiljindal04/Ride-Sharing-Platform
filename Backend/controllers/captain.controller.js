const captainModel = require("../db/Models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.services");

module.exports.registerCaptain = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType }
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
    vehicle: { color, plate, capacity, vehicleType }
  });

  const token = await captain.generateAuthToken();
  res.status(201).json({ captain, token });
};
