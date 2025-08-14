import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  axios.post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log("Logout successful", response);
    localStorage.removeItem("token");
    navigate("/captainLogin");
  })
  .catch((error) => {
    console.error("Error logging out:", error);
  });

  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout
