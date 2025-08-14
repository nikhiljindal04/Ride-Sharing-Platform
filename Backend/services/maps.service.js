const axios = require("axios");
const captainModel = require("../db/Models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;

  try {
    const response = await axios.get(url, {
      params: {
        address,
        key: apiKey,
      },
    });

    const results = response.data.results;
    if (!results || results.length === 0) {
      throw new Error("No coordinates found for the given address");
    }

    const location = results[0].geometry.location;
    return {
      ltd: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error("Failed to fetch coordinates");
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
  try {
    const response = await axios.get(url, {
      params: {
        origins: origin,
        destinations: destination,
        key: apiKey,
      },
    });

    const result = response.data.rows[0].elements[0];
    if (result.status !== "OK") {
      throw new Error("Failed to fetch distance and time");
    }

    return {
      distance: result.distance,
      duration: result.duration,
      status: result.status,
    };
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw new Error("Failed to fetch distance and time");
  }
}

module.exports.getSuggestions = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

  try {
    const response = await axios.get(url, {
      params: {
        input: address,
        key: apiKey,
      },
    });

    const predictions = response.data.predictions;
    if (!predictions || predictions.length === 0) {
      throw new Error("No suggestions found for the given address");
    }

    return predictions.map((prediction) => prediction.description);
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw new Error("Failed to fetch suggestions");
  }
};

module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {
  if (!ltd || !lng || !radius) {
    throw new Error("Latitude, longitude, and radius are required");
  }
  console.log("Fetching captains in radius:", { ltd, lng, radius });
  try {
    console.log(ltd, lng, radius);
    const data = await captainModel.findById("6864d2c1aa05ba0f0d0ffd5d");
    console.log("Data:", data.location);
    const captains = await captainModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, ltd],
          },
          $maxDistance: radius * 1000, // Convert radius to meters
        },
      },
    });

    return captains;
  } catch (error) {
    console.error("Error fetching captains in the radius:", error.message);
    throw new Error("Failed to fetch captains in the radius");
  } 

   
};
