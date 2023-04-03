import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../auth/AuthContext";
import coin from "../../assets/coin.png";
import "./ProfileModal.css";

const ProfileButton = ({ onClick }) => {
    const { userProfile } = useAuth();

    return (
        <div className="center-row profileButtonContainer">
            <button className="profileButton" onClick={onClick}>
                <MenuIcon />
            </button>
            <img src={coin} alt="coin" height={50} />
            <h2>{userProfile.score}</h2>
        </div>
    );
};

export default ProfileButton;
