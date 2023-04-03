import React from "react";
import { useFormik } from "formik";

import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../auth/AuthContext";

const SettingsForm = () => {
    const { updateUserPassword, reauthenticate } = useAuth();
    const { showNotification } = useNotification();

    const submitAction = async (values) => {
        console.log(values);
        // validate values
        if (!values.oldPassword || !values.newPassword) {
            showNotification("Please fill out all fields.", "error");
            return;
        }

        try {
            console.log("reauthenticating...", values.oldPassword);
            await reauthenticate(values.oldPassword);
            await updateUserPassword(values.newPassword);
            showNotification("Password updated successfully.", "success");
        } catch (error) {
            console.log(error);
            showNotification(error.message, "error");
        }
    };

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
        },
        onSubmit: (values) => submitAction(values),
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Settings:</h2>

            <h3>Update Password:</h3>
            <div className="settings-form-container">
                <div className="justify-between">
                    <input
                        type="password"
                        name="oldPassword"
                        onChange={formik.handleChange}
                        value={formik.values.oldPassword}
                        minLength="6"
                        placeholder="Old Password"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        minLength="6"
                        placeholder="New Password"
                    />
                </div>
                <button type="submit" className="modal-button settings-submit">
                    Reset Password
                </button>
            </div>
        </form>
    );
};

export default SettingsForm;
