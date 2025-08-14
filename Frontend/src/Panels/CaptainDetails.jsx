import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between m-3">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://imgs.search.brave.com/HsNBmKe7Tk7w7GBwSECEtKMnjtCxQiDn5cCA4aHsV-Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzIyLzAx/LzEyLzIyMDExMmNl/OWMzOTY3ZTIwMjJj/ZTEzNjczYTlkNGY2/LmpwZw"
            alt=""
          />
          <h4 className="text-lg font-medium">{captain.fullName.firstName + " " +captain.fullName.lastName}</h4>
        </div>

        <div>
          <h4 className="text-xl font-semibold">&#8377;298.2</h4>
          <p className="text-sm font-medium">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-5 items-start p-2 rounded-xl bg-gray-100 mt-6 mx-1">
        <div className="text-center">
          <i className="text-3xl font-extralight ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl font-extralight ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>{" "}
        </div>
        <div className="text-center">
          <i className="text-3xl font-extralight ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
