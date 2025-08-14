import React from "react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Panels/LocationSearchPanel";
import VehiclePanel from "../Panels/VehiclePanel";
import ConfirmedRidePanel from "../Panels/ConfirmedRidePanel";
import LookingForDriver from "../Panels/LookingForDriver";
import WaitingForDriver from "../Panels/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const confirmedRideRef = useRef(null);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const [activeField, setActiveField] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    function () {
      if (confirmedRidePanel) {
        gsap.to(confirmedRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmedRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 ml-8 absolute"
        src="https://imgs.search.brave.com/dM7ayL6GDeUdg0B9CD0crlUFx0UiJNfkV76vRd3YMGc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMzLzIvdWJlci1s/b2dvLXBuZ19zZWVr/bG9nby0zMzg4NzIu/cG5n"
      ></img>
      <div className="w-screen h-screen">
        <img
          className="w-full h-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
      </div>
      <div className=" flex flex-col justify-end w-full absolute h-screen top-0">
        <div className=" bg-white h-[37%] p-5 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute right-4 top-4 text-2xl"
          >
            <i className="ri-arrow-down-wide-fill "></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-3">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line h-18 w-1 bg-black absolute left-10 top-19"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              className="bg-[#eee] w-full px-10 p-3 rounded-lg"
              placeholder="Add a pick-up location"
              type="text"
              value={pickup}
              onChange={handlePickupChange}
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              className="bg-[#eee] w-full px-10 p-3 mt-2 rounded-lg"
              placeholder="Enter your destination"
              type="text"
              value={destination}
              onChange={handleDestinationChange}
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 px-3 bg-white w-full py-4 translate-y-full"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmedRidePanel={setConfirmedRidePanel}
        />
      </div>
      <div
        ref={confirmedRideRef}
        className="fixed z-10 bottom-0 px-6 bg-white w-full py-4 translate-y-full"
      >
        <ConfirmedRidePanel
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehiclePanel={setVehiclePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 px-6 bg-white w-full py-4 translate-y-full"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          setConfirmedRidePanel={setConfirmedRidePanel}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bottom-0 px-6 bg-white w-full py-4 translate-y-full"
      >
        <WaitingForDriver
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          waitingForDriverPanel={waitingForDriverPanel}
        />
      </div>
    </div>
  );
};

export default Home;
