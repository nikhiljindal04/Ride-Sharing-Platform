import React from "react";

const VehiclePanel = (props) => {
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
      <h2 className="text-2xl font-semibold mb-5">Choose a vehicle</h2>
      
      <div
        onClick={() => {
          props.setVehicleType('car')
          props.setConfirmedRidePanel(true);
        }}
        className="flex active:border-2 bg-gray-100 rounded-xl mb-2 p-3 w-full items-center justify-between"
      >
        <img
          className="h-11"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        ></img>
        <div className="max-w-50 -ml-2">
          <h4 className="font-medium text-sm">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-base text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="font-semibold text-lg">&#x20b9; {(props.fare?.car ?? 0)}

</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.setVehicleType('motorcycle')
        }}
        className="flex active:border-2 bg-gray-100 rounded-xl mb-2 p-3 w-full items-center justify-between"
      >
        <img
          className="h-11"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
        ></img>
        <div className=" max-w-50">
          <h4 className="font-medium text-sm">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-base text-xs">Affordable, Motorcycle rides</p>
        </div>
        <h2 className="font-semibold text-lg">&#x20b9; {(props.fare?.motorcycle ?? 0)}</h2>
      </div>
      <div
        onClick={() => {
          props.setVehicleType('auto')
          props.setConfirmedRidePanel(true);
        }}
        className="flex active:border-2 bg-gray-100 rounded-xl mb-2 p-3 w-full items-center justify-between"
      >
        <img
          className="h-11"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        ></img>
        <div className=" max-w-50 -ml-6">
          <h4 className="font-medium text-sm">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">4 min away</h5>
          <p className="font-base text-xs">Affordable, Auto rides</p>
        </div>
        <h2 className="font-semibold text-lg">&#x20b9; {(props.fare?.auto ?? 0)}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
