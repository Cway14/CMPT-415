import React, { useContext, useEffect, useState } from "react";
import { useLever } from "./LeverContext";

const PlayerContext = React.createContext();

export function usePlayer() {
    return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
    const { leverState, setLeverState } = useLever();
    // stores the state of each lever
    const [currentRoom, setCurrentRoom] = useState();
    const [roomsEntered, setRoomsEntered] = useState([]);

    const getLeverIdsInRoom = (room) => {
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

    const hasEnteredRoom = (room) => {
        return roomsEntered.includes(room);
    };

    const setGameContext = (context) => {
        setCurrentRoom(context.room);
        setRoomsEntered(context.roomsEntered);

        const newLeverState = [...leverState];
        context.leversCompleted.forEach((leverIndex) => {
            newLeverState[leverIndex].current = true;
        });
        setLeverState(newLeverState);
    };

    useEffect(() => {
        // TODO: update server with current room
    }, [currentRoom]);

    const value = {
        currentRoom,
        getLeverIdsInRoom,
        setGameContext,
        hasEnteredRoom,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}
