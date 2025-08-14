const http = require("http");
const app = require("./app"); // Import the Express app
const { initializeSocket } = require("./socket"); // Import socket functions

const port = process.env.PORT; // Use environment variable or default to 3000

const server = http.createServer(app);

initializeSocket(server); // Initialize Socket.IO

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
