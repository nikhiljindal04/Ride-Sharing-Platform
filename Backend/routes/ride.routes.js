const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { check, body } = require("express-validator");
const rideController = require("../controllers/rides.controller");

router.get(
  "/get-fare",
  authMiddleware.authenticateUser,
  [
    check("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    check("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
  ],
  rideController.getFare
);

router.post(
  "/create-ride",
  authMiddleware.authenticateUser,
  [
    body("pickupLocation")
      .notEmpty()
      .withMessage("Pickup location is required"),
    body("destinationLocation")
      .notEmpty()
      .withMessage("Destination location is required"),
    body("vehicleType").notEmpty().withMessage("Vehicle type is required"),
  ],
  rideController.createRide
);

router.post(
  "/confirm-ride",
  authMiddleware.authenticateCaptain,
  [body("rideId").notEmpty().withMessage("Ride ID is required")],
  rideController.confirmRide
);

router.post("/start-ride", authMiddleware.authenticateCaptain, [
  body("rideId").notEmpty().withMessage("Ride ID is required"),
  body("otp").notEmpty().withMessage("OTP is required"),
], rideController.startRide);

router.post(
  "/finish-ride",
  authMiddleware.authenticateCaptain,
  [body("rideId").notEmpty().withMessage("Ride ID is required")],
  rideController.finishRide
);

module.exports = router;
