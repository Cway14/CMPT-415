import React, { useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/material/styles";

import { useAuth } from "../../auth/AuthContext";
import SettingsForm from "./SettingsForm";
import useGame from "../../@core/useGame";
import coin from "../../assets/coin.png";

const ProfileModal = ({ closeModal }) => {
    const { setPaused } = useGame();
    const { userProfile, logout } = useAuth();

    const [showSettings, setShowSettings] = React.useState(false);
    const [statistics, setStatistics] = React.useState({
        totalCorrect: 0,
        totalAnswered: 0,
    });
    const progress = (statistics.totalCorrect / statistics.totalAnswered) * 100;

    const getUserStatistics = async () => {
        const response = await fetch(
            process.env.REACT_APP_API + "/statistics?id=" + userProfile.id
        );
        const data = await response.json();
        setStatistics(data);
    };

    // Pause game when modal is open
    useEffect(() => {
        setPaused(true);
        return () => setPaused(false);
    });

    useEffect(() => {
        getUserStatistics();
    }, [userProfile]);

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
                            <div className="center-row">
                                <img src={coin} alt="coin" height={30} />
                                <p>{userProfile.score}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profileModalStats">
                        <div>
                            <h4>
                                Correctly Answered Questions:
                                {" " + statistics.totalCorrect} /{" "}
                                {statistics.totalAnswered}
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
