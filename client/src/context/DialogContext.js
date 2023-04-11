import React, { useContext, useState } from "react";
import DialogModal from "components/DialogModal/DialogModal";
import { usePlayer } from "./PlayerContext";

const DialogContext = React.createContext();

export function useDialog() {
    return useContext(DialogContext);
}

export function DialogProvider({ children }) {
    const [dialogModal, setDialogModal] = useState(<></>);
    const { currentRoom, hasEnteredRoom } = usePlayer();

    // pass array of messages to showDialog, and it will display them one by one

    function showDialog(newMessages, forceShow = false) {
        if (!forceShow) {
            // if forceShow is true, it will show the dialog even player has seen it before
            if (hasEnteredRoom(currentRoom)) return;
        }

        setDialogModal(
            <DialogModal messages={newMessages} onClose={closeModal} />
        );
    }

    const closeModal = () => {
        setDialogModal(<></>);
    };

    const value = {
        showDialog,
    };

    return (
        <DialogContext.Provider value={value}>
            {dialogModal}
            {children}
        </DialogContext.Provider>
    );
}
