import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      navigate("/captainHome");

    }
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen  ">
      <div>
        <img
          className="w-12 mb-6"
          src="https://imgs.search.brave.com/rSuSSYacx1C8jOOc6iUc_xal-ahK3vL90Pl-NKUkJSE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw"
        ></img>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-base mb-2 font-medium">What is your name</h3>
          <div className="flex gap-2">
            <input
              required
              className="bg-[#eeeeee] mb-5 rounded px-4 w-1/2 py-2  flex  text-lg placeholder:text-sm"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-1/2  flex  text-lg placeholder:text-sm"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <h3 className="text-base mb-2 font-medium">What is your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2  flex w-full text-lg placeholder:text-sm"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2  flex w-full text-lg placeholder:text-sm"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <h3 className="text-base font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-2 mb-5">
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mb-5">
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              type="number"
              min="1"
              placeholder="Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-sm"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <button className="bg-[#111] text-white w-full rounded font-semibold px-4 py-3 mb-3">
            Sign In
          </button>
        </form>
        <p className="text-center">
          Already have a account{" "}
          <Link to="/captainLogin" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight mt-6">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
