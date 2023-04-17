import React, { useContext, useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNotification } from "./NotificationContext";

const LeverContext = React.createContext();

export function useLever() {
    return useContext(LeverContext);
}

export function LeverProvider({ children }) {
    const { userProfile } = useAuth();
    const { showNotification } = useNotification();
    const [currentLever, setCurrentLever] = useState(0);

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

    const changeLeverState = () => {
        const index = currentLever;
        const newState = [...leverState];
        newState[index].current = !newState[index].current;
        setLeverState(newState);

        // update the lever state in the database
        const url =
            process.env.REACT_APP_API +
            "/game/lever_completed?id=" +
            userProfile.id +
            "&lever_id=" +
            index;
        try {
            fetch(url, { method: "POST" });
        } catch (error) {
            showNotification("Error: failed to save game state", "error");
        }
    };

    const value = {
        leverState,
        changeLeverState,
        setLeverState,
        currentLever,
        setCurrentLever,
    };

    return (
        <LeverContext.Provider value={value}>{children}</LeverContext.Provider>
    );
}
