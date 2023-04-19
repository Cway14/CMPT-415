import React, { useContext, useEffect, useState } from "react";
import { useLever } from "./LeverContext";
import { useAuth } from "../auth/AuthContext";
import { useNotification } from "./NotificationContext";

const PlayerContext = React.createContext();

export function usePlayer() {
    return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
    const { leverState, setLeverState } = useLever();
    const { userProfile } = useAuth();
    const { showNotification } = useNotification();
    // stores the state of each lever
    const [currentRoom, setCurrentRoom] = useState();
    const [roomsEntered, setRoomsEntered] = useState([]);

    const getLeverIdsInRoom = (room) => {
        switch (room) {
            case "bedroom":
                return [0];
            case "halloflevers":
                return [1, 2, 3];
            case "room2":
                return [3];
            case "greathall":
                return [4, 5, 6, 7];
            case "keyroom":
                return [8, 9, 10, 11];
            default:
                return [];
        }
    };

    const hasEnteredRoom = (room) => {
        return roomsEntered.includes(room);
    };

    const completedRoom = (room) => {
        const levers = getLeverIdsInRoom(room);

        const all_levers_complete = levers.every(
            (leverId) => leverState[leverId].current
        );

        return all_levers_complete;
    };

    const setGameContext = (context) => {
        setCurrentRoom(context.current_room);
        setRoomsEntered(context.rooms_entered);

        const newLeverState = [...leverState];
        context.levers_completed.forEach((leverIndex) => {
            newLeverState[leverIndex].current = true;
        });
        setLeverState(newLeverState);
    };

    async function getGameContext() {
        try {
            const url =
                process.env.REACT_APP_API +
                "/game/context?id=" +
                userProfile.id;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const gameContext = await response.json();
            setGameContext(gameContext);
        } catch (error) {
            console.log("error: ", error);
            showNotification("An error occurred. Please try again.", "error");
        }
    }

    useEffect(() => {
        // update the current room in the database
        if (!currentRoom) return;
        const url =
            process.env.REACT_APP_API +
            "/game/current_room?id=" +
            userProfile.id +
            "&room=" +
            currentRoom;

        try {
            fetch(url, {
                method: "PUT",
            });
        } catch (error) {
            showNotification("Error: failed to save game progress", "error");
        }
    }, [currentRoom]);

    useEffect(() => {
        if (!userProfile.id) return;
        getGameContext();
    }, [userProfile]);

    const value = {
        currentRoom,
        setCurrentRoom,
        getLeverIdsInRoom,
        setGameContext,
        hasEnteredRoom,
        completedRoom,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}
