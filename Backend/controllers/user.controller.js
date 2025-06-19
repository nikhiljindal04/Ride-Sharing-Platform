const userModel = require("../db/Models/User.models.js");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName: { firstName, lastName }, email, password } = req.body;
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
