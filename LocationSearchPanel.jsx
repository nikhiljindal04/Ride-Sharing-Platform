import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "4B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "22C, Near Singham's cafe, Sheryians Coding School, Bhopal",
    "22C, Near Singham's cafe, Sheryians Coding School, Bhopal",
    "22C, Near Sharma's cafe, Sheryians Coding School, Bhopal",
  ];

  return (
    <>
      {locations.map(function (elem, idx) {
        return (
          <div key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false)
            }}
            className="flex gap-4 items-center justify-start p-3 active:border-2 bg-gray-100 my-3 mx-4 rounded-xl"
          >
            <h2 className="bg-[#eee] h-8 w-12 rounded-full flex justify-center items-center">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </>
  );
};

export default LocationSearchPanel;
