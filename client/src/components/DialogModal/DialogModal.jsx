import React, { useEffect } from "react";

import "./DialogModal.css";
// Dialog modal component

const DialogModal = ({ messages, closeModal, onClose }) => {
    let currentMessage = -1;
    const speed = 35;
    const nextActionButton = (
        <svg
            width="60px"
            height="60px"
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M128,20A108,108,0,1,0,236,128,108.12249,108.12249,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.095,84.095,0,0,1,128,212Zm36.02734-92.91943a11.9993,11.9993,0,0,1,0,17.83886l-40,36a11.99977,11.99977,0,1,1-16.05468-17.83886L138.062,128l-30.08935-27.08057a11.99977,11.99977,0,1,1,16.05468-17.83886Z" />
        </svg>
    );

    async function typeWriter(index) {
        let text = messages[index];
        if (!text) return;

        document.getElementById("dialog").innerHTML = " ";
        await new Promise((r) => setTimeout(r, 500)); // wait 500ms before starting

        let i = 0;
        while (i < text.length) {
            if (index !== currentMessage) return; // if the user has clicked the next button, stop typing (and don't show the rest of the message
            document.getElementById("dialog").innerHTML += text.charAt(i);
            i++;
            await new Promise((r) => setTimeout(r, speed)); // wait 35ms before next character
        }
    }

    useEffect(() => {
        nextMessage();
    }, [messages]);

    const close = () => {
        onClose?.();
        closeModal();
    };

    const nextMessage = () => {
        currentMessage++;
        if (currentMessage === messages.length) close();
        else typeWriter(currentMessage);
    };

    return (
        <div className="dialog-modal">
            <p id="dialog"></p>
            <button onClick={() => nextMessage()}>{nextActionButton}</button>
        </div>
    );
};

export default DialogModal;
