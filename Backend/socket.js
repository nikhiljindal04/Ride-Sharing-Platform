const { Server } = require("socket.io");
const userModel = require("./db/Models/User.models"); // Adjust the path as necessary
const captainModel = require("./db/Models/captain.model"); // Adjust the path as necessary

let io = null;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust as needed for production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      try {
        if (userType === "user") {
          const user = await userModel.findByIdAndUpdate(userId, {
            $set: { socketId: socket.id },
          });
          if (user) {
            console.log("User joined:", userId);
          }
        } else if (userType === "captain") {
          const captain = await captainModel.findByIdAndUpdate(userId, {
            $set: { socketId: socket.id },
          });
          if (captain) {
            console.log("Captain joined:", userId);
          }
        }
      } catch (error) {
        console.error("Error joining socket:", error);
      }
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location.coordinates || !location.coordinates[0] || !location.coordinates[1]) {
        console.error("Invalid location data:", location);
        return;
      }

      try {
        await captainModel.findByIdAndUpdate(userId, {
          $set: { location: { type: "Point", coordinates: [location.coordinates[0], location.coordinates[1]] } },
        });
        console.log("Captain location updated:", location);
      } catch (error) {
        console.error("Error updating captain location:", error);
      }
    });
    
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, event, data) {
  if (io) {
    io.to(socketId).emit(event, data);
  } else {
    console.error("Socket.IO is not initialized.");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
