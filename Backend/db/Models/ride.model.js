const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  destinationLocation: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fare: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentID: {
    type: String,
  },
  orderID: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
  },
});

module.exports = mongoose.model("ride", rideSchema);
