import React from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = React.useState(true);
  const { captain, loginCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      console.log("Captain not logged in, redirecting to captain login page");
      navigate("/captainLogin");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          loginCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token");
        setIsLoading(false);
        navigate("/captainLogin");
      });

    }, [token, navigate]);
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
