const rideModel = require("../db/Models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const { distance, duration } = await mapsService.getDistanceAndTime(
    pickup,
    destination
  );

  const fareConfig = {
    car: { baseFare: 50, perKmRate: 15, perMinuteRate: 2 },
    auto: { baseFare: 30, perKmRate: 10, perMinuteRate: 1.5 },
    motorcycle: { baseFare: 20, perKmRate: 8, perMinuteRate: 1 },
  };

  const distanceInKm = distance.value / 1000;
  const durationInMinutes = duration.value / 60;

  const fares = {};
  for (const [type, config] of Object.entries(fareConfig)) {
    const fare =
      config.baseFare +
      distanceInKm * config.perKmRate +
      durationInMinutes * config.perMinuteRate;

    fares[type] = Number(fare.toFixed(1));
  }


  return fares;
};

module.exports.getFare = getFare;

function getOTP(num) {
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error("Number of digits must be a positive integer");
  }
  const max = Math.pow(10, num);
  const otp = crypto.randomInt(0, max);
  // Pad with leading zeros if necessary
  return otp.toString().padStart(num, "0");
}

module.exports.createRide = async (
  user,
  pickupLocation,
  destinationLocation,
  vehicleType
) => {
  if (!user || !pickupLocation || !destinationLocation || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickupLocation, destinationLocation);

  const rideData = {
    user,
    pickupLocation,
    destinationLocation,
    vehicleType,
    fare: fare[vehicleType.toLowerCase()],
    status: "pending",
    otp: getOTP(6), // Generate a 6-digit OTP
  };

  const newRide = new rideModel(rideData);
  return await newRide.save();
};

module.exports.confirmRide = async (captainId, rideId) => {
  if (!rideId || !captainId) {
    throw new Error("Ride ID and captain are required");
  }

  const ride = await rideModel.findById(rideId).select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "pending") {
    throw new Error("Ride is not in a pending state");
  }
  //populate the user and captain details
  ride.captain = captainId;
  //populate captain with  otp
  await ride.populate("captain");
  await ride.populate("user");
  ride.status = "accepted";
  return await ride.save();
};

module.exports.startRide = async (rideId, otp) => {
  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }
  const ride = await rideModel.findById(rideId).select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride is not in an accepted state");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  ride.status = "in-progress";
  //populate the user and captain details
  await ride.populate("captain");
  await ride.populate("user");
  return await ride.save();
};

module.exports.finishRide = async (rideId) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  const ride = await rideModel.findById(rideId);
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "in-progress") {
    throw new Error("Ride is not in progress");
  }

  ride.status = "completed";
  //populate the user and captain details
  await ride.populate("captain");
  await ride.populate("user");
  return await ride.save();
};
