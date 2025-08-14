import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRideCaptain from "../Panels/FinishRideCaptain";

const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const { ride } = location.state || {};
  console.log("Ride in CaptainRiding:", ride);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative">
      <div className="fixed p-3 top-0% flex items-center justify-between w-screen">
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
      <div className="h-4/5">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between relative pt-10 bg-yellow-300"
      onClick={()=> {
        setFinishRidePanel(true);
      }}>
        <h4 className="p-1 text-center w-[90%] absolute top-0 text-2xl">
          <i className="ri-arrow-down-wide-fill"></i>
        </h4>
        <h4 className="text-xl font-semibold">4Km Away</h4>
        <button className=" bg-green-600 rounded-lg p-3  px-10 text-white font-semibold">
          Complete Ride
        </button>
      </div>
      <div ref={finishRidePanelRef} className="fixed z-10 bottom-0 px-3 bg-white w-full py-10 pt-4 translate-y-full ">
        <FinishRideCaptain 
      ride={ride}
        setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
