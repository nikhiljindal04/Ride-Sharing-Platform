import React from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = React.useState(true);
  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!token) {
      console.log("User not logged in, redirecting to login page");
      navigate("/userLogin");
    }

    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token");
        setIsLoading(false);
        navigate("/userLogin");
      });
  }, [token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
