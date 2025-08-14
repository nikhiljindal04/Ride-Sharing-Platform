import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopupCaptain = (props) => {
  const [otp, setOtp] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (otp === null || otp === "") {
      alert("Please enter the OTP");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          rideId: props.ride?._id,
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        console.log("Ride confirmed successfully &", response.data.ride);
        props.setConfirmRidePopupPanel(false);
        navigate("/captainRiding", { state: { ride: response.data.ride } });
      } else {
        alert("Failed to confirm ride");
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
      alert("An error occurred while confirming the ride");
    }
    
  };

  return (
    <div>
      <h4
        className=" p-1 text-center w-[100%] top-0 text-2xl"
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h4>
      <h2 className="text-2xl font-semibold mb-5">
        Confirm this Ride to Start!
      </h2>
      <div className="flex items-center justify-between mt-8 bg-yellow-300 rounded-lg p-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
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
                {props.ride?.pickupLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destinationLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">&#x20b9;193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col w-full">
          <form
            onSubmit={submitHandler}
          >
            <input
              type="number"
              value= {otp || ""}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="bg-[#eeeeee] mb-7 rounded px-6 py-2  flex w-full text-lg placeholder:text-base"
            />
            <button
              type="submit"
              onClick={() => {
              
                props.setConfirmRidePopupPanel(false);
              }}
              className="w-full text-lg flex mb-3 py-2.5 justify-center items-center bg-green-500 rounded-lg p-2 text-white font-semibold"
            >
              Accept
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
              }}
              className="w-full text-lg py-2.5 bg-gray-400 rounded-lg p-2 text-white font-semibold"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopupCaptain;
