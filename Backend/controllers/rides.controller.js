const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../db/Models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = req.user._id; // Assuming user is set by auth middleware
    const { pickupLocation, destinationLocation, vehicleType } = req.body;

    if (!user || !pickupLocation || !destinationLocation || !vehicleType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ride = await rideService.createRide(
      user,
      pickupLocation,
      destinationLocation,
      vehicleType
    );
    res.status(201).json({ message: "Ride created successfully", ride });

    const pickupCoordinates = await mapService.getAddressCoordinate(
      pickupLocation
    );
    console.log("Pickup Coordinates:", pickupCoordinates);

    const captainInRadius = await mapService.getCaptainsInRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      5
    );
    console.log("Captains in radius:", captainInRadius);
    ride.otp = "";

    const rideWithUser = await rideModel.findById(ride._id).populate("user");

    captainInRadius.forEach((captain) => {
      const captainSocketId = captain.socketId;
      if (captainSocketId) {
        sendMessageToSocketId(captainSocketId, "new-ride", {
          ride: rideWithUser,
        });
      }
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getFare = async (req, res) => {
  const { pickup, destination, vehicleType } = req.query;

  if (!pickup || !destination) {
    return res
      .status(400)
      .json({ message: "Pickup and destination are required" });
  }

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    console.error("Error fetching fare:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if(req.body) {
      console.log("Request body:", req.body);
    }
    if(req.user) {
      console.log("User from request:", req.user);
    }
    if(req.captain) {
      console.log("Captain from request:", req.captain);
    }
    const { rideId } = req.body;
    const captainId = req.captain._id; // Assuming captain is set by auth middleware

    if (!rideId) {
      return res.status(400).json({ message: "Ride ID is required" });
    }

    const ride = await rideService.confirmRide(captainId, rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    sendMessageToSocketId(ride.user.socketId, "ride-confirmed", { ride });

    return res.status(200).json({ message: "Ride confirmed successfully", ride });
  } catch (error) {
    console.error("Error confirming ride:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { rideId, otp } = req.body;
    const captainId = req.captain._id; // Assuming captain is set by auth middleware

    if (!rideId || !otp) {
      return res.status(400).json({ message: "Ride ID and OTP are required" });
    }

    const ride = await rideService.startRide(rideId, otp);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found or already started" });
    }

    sendMessageToSocketId(ride.user.socketId, "ride-started", { ride });

    return res.status(200).json({ message: "Ride started successfully", ride });
  } catch (error) {
    console.error("Error starting ride:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.finishRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { rideId } = req.body;
    const captainId = req.captain._id; // Assuming captain is set by auth middleware

    if (!rideId) {
      return res.status(400).json({ message: "Ride ID is required" });
    }

    const ride = await rideService.finishRide(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found or already finished" });
    }

    sendMessageToSocketId(ride.user.socketId, "ride-finished", { ride });

    return res.status(200).json({ message: "Ride finished successfully", ride });
  } catch (error) {
    console.error("Error finishing ride:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
