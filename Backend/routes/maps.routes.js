const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth.middleware");
const mapsController = require("../controllers/maps.controller");
const { check } = require("express-validator");

router.get("/about", (req, res) => {
  res.send("About Maps page");
});

router.get(
  "/mapsCoordinates",
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .bail()
    .customSanitizer((value) => value.trim()) // optional
    .exists({ checkFalsy: true }),
  authenticateUser,
  mapsController.getCoordinates
);

router.get(
  "/get-distance-time",
  [
    check("origin")
      .notEmpty()
      .withMessage("Origin is required")
      .bail()
      .customSanitizer((value) => value.trim()), // optional
    check("destination")
      .notEmpty()
      .withMessage("Destination is required")
      .bail()
      .customSanitizer((value) => value.trim()), // optional
  ],
  authenticateUser,
  mapsController.getDistanceAndTime
);

router.get(
  "/get-suggestions",
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .bail()
    .customSanitizer((value) => value.trim()),
  authenticateUser,
  mapsController.getSuggestions
);

module.exports = router;
