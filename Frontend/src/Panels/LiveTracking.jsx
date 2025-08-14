import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const defaultCenter = { lat: 23.2599, lng: 77.4126 }; // fallback center

function LiveTracking(props) {
  const mapContainerStyle = {
    width: "100%",
    height: "62vh", // Default height if not provided
    borderRadius: "8px",
  };

  const [currentPosition, setCurrentPosition] = useState(null);
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
            setCenter({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting current position:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getCurrentPosition();
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
        >
          {currentPosition && <Marker position={currentPosition} label="You" />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default LiveTracking;
