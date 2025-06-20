const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const { authenticateUser } = require("../middleware/auth.middleware");
const blacklistToken = require("../db/Models/blacklistToken.model");

router.post(
  "/register",
  [
    body("fullName.firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authenticateUser, userController.getUserProfile);

// I have send the token to cookies with 24 hours expiry and then I logged out after 1 hours so I can use the same token to send the request from postman and it will works for next 23 hours untill it gets expired from my server.

router.post("/logout", authenticateUser, userController.logoutUser);

module.exports = router;
