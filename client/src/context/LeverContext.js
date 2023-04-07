import React, { useContext, useState, useRef } from "react";

const LeverContext = React.createContext();

export function useLever() {
    return useContext(LeverContext);
}

export function LeverProvider({ children }) {
    // stores the state of each lever
    const [leverState, setLeverState] = useState([
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
        useRef(false),
    ]);

    const changeLeverState = (index) => {
        const newState = [...leverState];
        newState[index].current = !newState[index].current;
        setLeverState(newState);
    };

    const value = {
        leverState,
        changeLeverState,
        setLeverState,
    };

    return (
        <LeverContext.Provider value={value}>{children}</LeverContext.Provider>
    );
}
