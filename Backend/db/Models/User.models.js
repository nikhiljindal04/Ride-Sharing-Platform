const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
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
    select: false, // Do not return password in queries
  },
  socketId: {
    type: String,
  },
});

//It creates a JWT token that includes the user’s ID and expires in 1 hour.
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

//It uses bcrypt to compare the plain password the user entered with the hashed password stored in the database.
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//It generates a salt and hashes a password. It’s used when saving a new user or updating a password.
UserSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

// | Code                                   | Type            | Used On  | Example                    |
// | -------------------------------------- | --------------- | -------- | -------------------------- |
// | `UserSchema.methods.generateAuthToken` | Instance method | Document | `user.generateAuthToken()` |
// | `UserSchema.statics.hashPassword`      | Static method   | Model    | `User.hashPassword()`      |
// This code defines a Mongoose schema for a User model with methods for authentication and password hashing.