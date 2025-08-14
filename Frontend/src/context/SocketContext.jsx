import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the server
    socketRef.current = io(import.meta.env.VITE_BASE_URL || "http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Send a message to a specific event
  const sendMessage = (eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  };

  // Listen for a message from a specific event
  const onMessage = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
    // Return a cleanup function to remove the listener
    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, callback);
      }
    };
  };

  return (
    <SocketContext.Provider
      value={{ sendMessage, onMessage, socket: socketRef.current }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for easy usage
export const useSocket = () => useContext(SocketContext);
