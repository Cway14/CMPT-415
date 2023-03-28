import React from "react";
import { useAuth } from "../../auth/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import "./ProfileModal.css";

const ProfileButton = ({ onClick }) => {
    return (
        <button className="profileButton" onClick={onClick}>
            <MenuIcon />
        </button>
    );
};

export default ProfileButton;
