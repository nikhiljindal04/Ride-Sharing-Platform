import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);

    const loginCaptain = (captainData) => {
        setCaptain(captainData);
    };
    const logoutCaptain = () => {
        setCaptain(null);
    };

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, loginCaptain, logoutCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;