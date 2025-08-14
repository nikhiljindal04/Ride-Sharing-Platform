import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";


const UserRiding = (props) => {
  // This component displays the user's ride details while they are riding
  const location = useLocation();
  const { ride } = location.state || {};
  console.log("ride in userRiding", ride);

  const navigate = useNavigate();
  const { onMessage } = React.useContext(SocketContext);

  //navigate to home page
  onMessage("ride-finished", (data) => {
    console.log("Ride updated:", data);
    navigate("/home");
  });

  return (
    <div className="h-screen">
      <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full text-xl">
        <i className="ri-home-2-fill"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png"
          ></img>
          <div>
            <h2 className="text-lg font-medium">{ride?.captain.fullName.firstName || "Driver Name"}</h2>
            <h4 className="text-xl font-semibold -mt-1">UP 15 GU 2072</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto </p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-col gap-4">
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div className="">
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.pickupLocation || "Pickup Location"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div className="">
                <h3 className="text-lg font-medium">&#x20b9;{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-5 w-full bg-green-500 rounded-lg p-2 text-white font-semibold">
          Make A Payment
        </button>
      </div>
    </div>
  );
};

export default UserRiding;
