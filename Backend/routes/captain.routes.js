const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const { body, validationResult } = require("express-validator");
const authMiddlewares = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("fullName.firstName").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
    body("vehicle.plate").notEmpty().withMessage("Vehicle plate is required"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Vehicle capacity must be a number"),
    body("vehicle.vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authMiddlewares.authenticateCaptain,
  captainController.loginCaptain
);

router.get("/profile", authMiddlewares.authenticateCaptain, captainController.getCaptainProfile);

router.post(
  "/logout",
  authMiddlewares.authenticateCaptain,
  captainController.logoutCaptain
);

module.exports = router;
