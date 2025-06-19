const dotenv = require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');


const express = require('express');
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/about', (req, res) => {
  res.send('About Us');
});



module.exports = app;