import React from "react";
import { useFormik } from "formik";

import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../auth/AuthContext";

const SettingsForm = () => {
    const { updatePassword } = useAuth();
    const { showNotification } = useNotification();

    const submitAction = async (values) => {
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
            await updatePassword(formik.newPassword1);
            showNotification("Password updated successfully.", "success");
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

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Settings:</h2>

            <h3>Update Password:</h3>
            <div className="settings-form-container">
                <div className="justify-between">
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
                <button type="submit" className="modal-button settings-submit">
                    Reset Password
                </button>
            </div>
        </form>
    );
};

export default SettingsForm;
