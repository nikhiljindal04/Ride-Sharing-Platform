const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Last name must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
    select: false, // Do not return password in queries
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      unique: true,
      minLength: [5, "Plate must be at least 5 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
    },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
       
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
      
    }
  }
});

captainSchema.index({ location: '2dsphere' });

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain;
// This code defines a Mongoose schema for a Captain model with fields for personal information, vehicle details, and location.