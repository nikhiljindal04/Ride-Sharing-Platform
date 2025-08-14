import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../Panels/CaptainDetails";
import RidePopupCaptain from "../Panels/RidePopupCaptain";
import ConfirmRidePopupCaptain from "../Panels/ConfirmRidePopupCaptain";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../Panels/LiveTracking"; // Assuming this is the correct path to your LiveTracking component

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [rideConfirmPopupPanel, setConfirmRidePopupPanel] = useState(false);
  const RidePopupPanelRef = useRef(null);
  const ConfirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(RidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );
  useGSAP(
    function () {
      if (rideConfirmPopupPanel) {
        gsap.to(ConfirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [rideConfirmPopupPanel]
  );

  const { captain } = React.useContext(CaptainDataContext);
  const { sendMessage, onMessage, socket } = React.useContext(SocketContext);

  useEffect(() => {
    sendMessage("join", { userId: captain._id, userType: "captain" });

    const sendLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Send the location to the server
            sendMessage("update-location-captain", {
              userId: captain._id,
              location: {
                type: "Point",
                coordinates: [
                  position.coords.longitude,
                  position.coords.latitude,
                ],
              },
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          {
            enableHighAccuracy: true, // ✅ This is critical
            timeout: 5000, // Optional: 20 seconds max wait
            maximumAge: 0, // Optional: do not reuse old location
          }
        );
      }
    };

    const intervalId = setInterval(() => {
      sendLocation();
    }, 25000);
    sendLocation();

    return () => clearInterval(intervalId);
  }, []);

  onMessage("new-ride", (data) => {
    console.log("New ride request received:", data);
    setRide(data.ride);
    setRidePopupPanel(true);
  });

  const confirmRide = async () => {
    if (!ride) {
      console.error("No ride data available to confirm.");
      return;
    }

    try {
      //with captain auth
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to confirm ride");
      }
      console.log("Ride confirmed successfully:", response.data);
      setConfirmRidePopupPanel(true);
      setRidePopupPanel(false);
    } catch (error) {
      console.error("Error confirming ride:", error);
      alert("Failed to confirm ride. Please try again.");
    }
  };

  return (
    <div className="h-screen">
      <div className="fixed p-3 to-0% flex items-center justify-between w-screen">
        <img
          className="w-16 ml-8"
          src="https://imgs.search.brave.com/dM7ayL6GDeUdg0B9CD0crlUFx0UiJNfkV76vRd3YMGc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMzLzIvdWJlci1s/b2dvLXBuZ19zZWVr/bG9nby0zMzg4NzIu/cG5n"
        ></img>
        <Link
          to="/captainHome"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full text-xl"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <div className="w-screen h-screen object-cover">
          <LiveTracking value={{ height: "60vh" }} />
        </div>
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>
      <div
        ref={RidePopupPanelRef}
        className="fixed z-10 bottom-0 px-6 bg-white w-full py-4 translate-y-full "
      >
        <RidePopupCaptain
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={ConfirmRidePopupPanelRef}
        className="fixed z-10 bottom-0 h-screen px-6 bg-white w-full py-4 translate-y-full "
      >
        <ConfirmRidePopupCaptain
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
