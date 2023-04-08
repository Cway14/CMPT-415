import React, { useEffect } from "react";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import useGame from "../../@core/useGame";
import { useDialog } from "../../context/DialogContext";

const ShowDelayedDialog = () => { // NOTE: only put in its own component so it doesnt show up until after the assets are loaded
    const messages = [
        "I finally escaped the Castle!!",
    ];

    const { showDialog } = useDialog();
    useEffect(() => {
        showDialog(messages);
    }, []);
    return <></>
}

const EndingModal = ({ closeModal }) => {
    const { setPaused } = useGame();

    // Pause game when modal is open
    useEffect(() => {
        setPaused(true);
        return () => setPaused(false);
    });

    const onContainerClick = (e) => {
        if (e.target.className.includes("endingModalContainer")) {
            closeModal();
        }
    };

    return (
        <div
            className="endingModalContainer"
            onClick={(e) => onContainerClick(e)}
        >
            <ShowDelayedDialog />
            <div className="endingModal">
                <div className="endingModalBody">
                </div>
               
            </div>
        </div>
    );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.mode === "light" ? "#f6685e" : "#f6685e",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 10,
        backgroundColor: theme.palette.mode === "light" ? "#4caf50" : "#308fe8",
    },
}));

export default EndingModal;
