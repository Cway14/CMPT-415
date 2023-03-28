import React from "react";
import { useFormik } from "formik";
import { PieChart } from "react-minimal-pie-chart";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../auth/AuthContext";

const ProfileModal = ({ closeModal }) => {
    const { userProfile, updatePassword, logout } = useAuth();
    const { showNotification } = useNotification();

    const onContainerClick = (e) => {
        if (e.target.className.includes("profileModalContainer")) {
            closeModal();
        }
    };

    const submitAction = (values) => {
        // validate values
        if (!formik.newPassword1 || !formik.newPassword2) {
            showNotification("Please fill out all fields.", "error");
            return;
        }

        if (formik.newPassword1 !== formik.newPassword2) {
            showNotification("Passwords do not match.", "error");
            return;
        }

        try {
            updatePassword(formik.newPassword1);
        } catch (error) {
            showNotification(error.message, "error");
        }
    };

    const formik = useFormik({
        initialValues: {
            newPassword1: "",
            newPassword2: "",
        },
        onSubmit: (values) => submitAction(values),
    });

    const pieChart = (
        <PieChart
            data={[
                { value: userProfile.score, color: "#00c300" },
                { value: 20, color: "#8b0000" },
            ]}
            lineWidth={20}
            label={({ dataEntry }) => {
                return dataEntry.value === userProfile.score
                    ? dataEntry.value + "/" + (userProfile.score + 20)
                    : "";
            }}
            labelStyle={{
                fontSize: "18px",
                fontFamily: "sans-serif",
                fill: "white",
            }}
            labelPosition={0}
            viewBoxSize={[100, 100]}
            radius={35}
            style={{ width: "fit-content", height: "fit-content" }}
            totalValue={userProfile.score + 20}
        />
    );

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
                            <h3>{userProfile.score + " pts"}</h3>
                        </div>
                    </div>
                </div>
                <div className="profileModalInfo">
                    <div className="profileModalStats">
                        <h2>Statistics:</h2>
                        {pieChart}
                    </div>
                    <div className="profileModalSettings">
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Settings:</h2>
                            <div>
                                <h3>Update Password:</h3>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword1}
                                    minLength="6"
                                    placeholder="New Password"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword2}
                                    minLength="6"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <button type="submit" className="modal-button">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
