import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogout from "./pages/CaptainLogout"; 
import CaptainHome from "./pages/CaptainHome";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Home from "./pages/Home";
import UserRiding from "./pages/UserRiding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRiding" element={<UserRiding />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/captainLogin" element={<CaptainLogin />} />
        <Route path="/captainSignup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/userLogout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captainLogout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captainHome"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captainRiding"
          element={
            <CaptainProtectWrapper>
              <CaptainRiding />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
