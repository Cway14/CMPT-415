import React, { useContext, useState } from "react";
import DialogModal from "components/DialogModal/DialogModal";
import { usePlayer } from "./PlayerContext";

const DialogContext = React.createContext();

export function useDialog() {
    return useContext(DialogContext);
}

export function DialogProvider({ children }) {
    const [currentDialog, setCurrentDialog] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const { currentRoom, hasEnteredRoom } = usePlayer();

    // pass array of messages to showDialog, and it will display them one by one
    // if forceShow is true, it will show the dialog even player has seen it before
    function showDialog(newMessages, forceShow = false) {
        if (!forceShow) {
            if (hasEnteredRoom(currentRoom)) return;
        }

        setCurrentDialog(newMessages.shift());
        setMessages(newMessages);
        setIsOpen(true);
    }

    // set the next message in the queue
    function nextMessage() {
        const localMessages = [...messages];
        const nextDialog = localMessages.shift();
        setMessages(localMessages);

        if (!nextDialog) {
            hideDialog();
            return;
        }

        setCurrentDialog(nextDialog);
    }

    function hideDialog() {
        setIsOpen(false);
    }

    const value = {
        currentDialog,
        isOpen,
        showDialog,
        hideDialog,
    };

    return (
        <DialogContext.Provider value={value}>
            {isOpen && (
                <DialogModal
                    text={currentDialog}
                    nextAction={() => nextMessage()}
                />
            )}
            {children}
        </DialogContext.Provider>
    );
}
