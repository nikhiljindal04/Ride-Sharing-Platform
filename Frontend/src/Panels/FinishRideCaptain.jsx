import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRideCaptain = (props) => {
  const navigate = useNavigate();

  const handleClick = async (rideId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/finish-ride`,
        {
          rideId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        console.log("Ride finished successfully &", response.data.ride);
        props.setFinishRidePanel(false);
        navigate("/captainHome", { state: { ride: response.data.ride } });
      } else {
        alert("Failed to finish ride");
      }
    } catch (error) {
      console.error("Error finishing ride:", error);
      alert("An error occurred while finishing the ride");
    }
  };

  return (
    <div>
      <h4
        className="text-center w-[100%] top-0 text-2xl"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h4>
      <h2 className="text-2xl font-semibold mb-5">
        Finish this Ride
      </h2>
      <div className="flex items-center justify-between mt-8 bg-yellow-300 rounded-lg p-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://imgs.search.brave.com/jryuutyJLexjJ8P-Ctg2OAA7GT8IjdVwuQijixer-VM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wbmctaGFwcHkt/bm9uYmluYXJ5LXBl/cnNvbi10cmFuc3Bh/cmVudC1iYWNrZ3Jv/dW5kXzUzODc2LTk0/NTc5Ni5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw"
            alt=""
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullName.firstName || "Driver Name"}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2Km</h5>
      </div>
      <div className="flex justify-between items-center flex-col gap-4">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickupLocation || "Pickup Location"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destinationLocation || "Destination Location"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">&#x20b9;{props.ride?.fare || 0}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col w-full">
          <button
            onClick={() => {
              handleClick(props.ride._id);
              props.setFinishRidePanel(false);
            }}
            className="w-full flex mb-3 py-2.5 text-lg justify-center items-center bg-green-500 rounded-lg p-2 text-white font-semibold"
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRideCaptain;
