import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/material/styles";

import { useAuth } from "../../auth/AuthContext";
import SettingsForm from "./SettingsForm";

const ProfileModal = ({ closeModal }) => {
    const { userProfile, logout } = useAuth();
    const totalQuestions = 40; // TODO: get from server
    const progress = (userProfile?.score / totalQuestions) * 100;
    const [showSettings, setShowSettings] = React.useState(false);

    const onContainerClick = (e) => {
        if (e.target.className.includes("profileModalContainer")) {
            closeModal();
        }
    };

    return (
        <div
            className="profileModalContainer"
            onClick={(e) => onContainerClick(e)}
        >
            <div className="profileModal">
                <button
                    onClick={() => logout()}
                    className="logout-button center-children"
                >
                    <LogoutIcon />
                    Log out
                </button>
                <div className="profileModalBody">
                    <div className="profileModalHeader">
                        <svg
                            className="profileModalHeaderIcon"
                            dangerouslySetInnerHTML={{
                                __html:
                                    userProfile?.profile_picture || "Profile",
                            }}
                        />
                        <div>
                            <h2>{userProfile.name}</h2>
                        </div>
                    </div>
                    <div className="profileModalStats">
                        <h2>Statistics:</h2>
                        <div>
                            <h4>
                                Correctly Answered Questions:
                                {" " + userProfile.score} / {totalQuestions}
                            </h4>
                            <BorderLinearProgress
                                variant="determinate"
                                value={progress}
                            />
                        </div>
                    </div>
                </div>
                <div className="profileModalFooter center-children">
                    <button
                        className="button-link"
                        onClick={() => setShowSettings(!showSettings)}
                    >
                        <div className="center-row">
                            {showSettings ? (
                                <>
                                    Hide Settings <ExpandLessIcon />
                                </>
                            ) : (
                                <>
                                    Show Settings <ExpandMoreIcon />
                                </>
                            )}
                        </div>
                    </button>
                    {showSettings && <SettingsForm />}
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

export default ProfileModal;
