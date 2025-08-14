import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const CaptainData = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, CaptainData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setCaptain(response.data.captain);

      localStorage.setItem("token", response.data.token);
      navigate("/captainHome");
    }

    setEmail("");
    setPassword("");
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
          <h3 className="text-base mb-2 font-medium">What is your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  flex w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="example@gmail.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  flex w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white w-full rounded font-semibold px-4 py-3 mb-3">
            Sign In
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captainSignup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/userLogin"
          className="bg-[#10b461] flex justify-center mb-7 text-white w-full rounded font-semibold text-lg px-4 py-3"
        >
          Sign In as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
