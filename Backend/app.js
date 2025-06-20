const dotenv = require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");

const express = require("express");
const app = express();
const connectDB = require("./db/db"); // Import the database connection function
const userRoutes = require("./routes/user.routes"); // Import user routes
const cookieParser = require("cookie-parser"); // Import cookie parser middleware
const captainRoutes = require("./routes/captain.routes"); // Import captain routes

connectDB(); // Connect to the database

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Use cookie parser middleware to handle cookies

app.use("/users", userRoutes);
app.use("/captains", captainRoutes); // Use captain routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  res.send("About Us");
});

module.exports = app;
