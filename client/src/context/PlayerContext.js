import React, { useContext, useState } from "react";
import { useLever } from "./LeverContext";

const PlayerContext = React.createContext();

export function usePlayer() {
    return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
    const { leverState, setLeverState } = useLever();
    // stores the state of each lever
    const [currentRoom, setCurrentRoom] = useState();

    const getLeverNumbers = (room) => {
        switch (room) {
            case "Bedroom":
                return [0];
            case "halloflevers":
                return [1, 2];
            case "room2":
                return [3];
            case "greathall":
                return [4, 5, 6, 7];
            case "keyroom":
                return [8, 9, 10, 11, 12];
            default:
                return [];
        }
    };

    const setGameContext = (context) => {
        setCurrentRoom(context.room);

        const newLeverState = [...leverState];
        context.leversCompleted.forEach((leverIndex) => {
            newLeverState[leverIndex].current = true;
        });
        setLeverState(newLeverState);
    };

    const value = {
        currentRoom,
        getLeverNumbers,
        setGameContext,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}
