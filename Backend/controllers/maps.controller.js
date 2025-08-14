const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = (req, res) => {
  // Logic to create a new map

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const address = req.query.address || req.body?.address;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }
  mapsService
    .getAddressCoordinate(address)
    .then((coordinates) => {
      res.status(200).json(coordinates);
    })
    .catch((error) => {
      console.error("Error fetching coordinates:", error.message);
      res.status(500).json({ error: "Failed to fetch coordinates" });
    });
};

module.exports.getDistanceAndTime = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

  mapsService
    .getDistanceAndTime(origin, destination)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error("Error fetching distance and time:", error.message);
      res.status(500).json({ error: "Failed to fetch distance and time" });
    });
};

module.exports.getSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const address = req.query.address || req.body?.address;

    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    const suggestions = await mapsService.getSuggestions(address);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};
