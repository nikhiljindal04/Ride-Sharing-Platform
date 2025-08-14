import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  axios
    .post(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("Logout successful", response);
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/userLogin"); // Redirect to login page
      }
    });
  return <div>UserLogout</div>;
};

export default UserLogout;
