import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();
  const { setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen  ">
      <div>
        <img
          className="w-16 mb-6"
          src="https://imgs.search.brave.com/dM7ayL6GDeUdg0B9CD0crlUFx0UiJNfkV76vRd3YMGc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMzLzIvdWJlci1s/b2dvLXBuZ19zZWVr/bG9nby0zMzg4NzIu/cG5n"
        ></img>
        <form onSubmit={(e)=> {
          submitHandler(e);
        }}>
          <h3 className="text-base mb-2 font-medium">What is your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  flex w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e)=> {
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
            onChange={(e)=> {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white w-full rounded font-semibold px-4 py-3 mb-3">
            Sign In
          </button>

        </form>
          <p className="text-center">New here? <Link to="/userSignup" className="text-blue-600">Create New Account</Link></p>
      </div>

      <div>
        <Link to="/captainLogin" className="bg-[#10b461] flex justify-center mb-7 text-white w-full rounded font-semibold text-lg px-4 py-3">
          Sign In as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
