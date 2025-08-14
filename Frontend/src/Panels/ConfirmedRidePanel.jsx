import React from "react";

const ConfirmedRidePanel = (props) => {
  return (
    <div>
      <h4
        className=" p-1 text-center w-[100%] top-0 text-2xl"
        onClick={() => {
          props.setVehiclePanel(false);
          props.setConfirmedRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h4>
      <h2 className="text-2xl font-semibold mb-5">Confirm your Ride</h2>
      <div className="flex justify-between items-center flex-col gap-4">
        <img
          className="h-30"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        ></img>
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">
                &#x20b9; {props.fare[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setConfirmedRidePanel(false);
            props.setVehicleFound(true);
            props.createRide();
          }}
          className="w-full bg-green-500 rounded-lg p-2 text-white font-semibold"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRidePanel;
