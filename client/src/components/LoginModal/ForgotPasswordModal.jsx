import React, { useState } from "react";
import { useFormik } from "formik";

import { useAuth } from "../../auth/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import "./LoginModal.css";

const DisplayNameModal = ({ setModal }) => {
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { showNotification } = useNotification();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => submit(values),
  });

  const submit = async (values) => {
    try {
      await resetPassword(values.email);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  if (submitted) {
    return (
      <div className="center-children">
        <h2>Email Sent to {formik.values.email}</h2>
        <button className="modal-button" onClick={() => setModal(null)}>
          Return home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="center-children">
      <label htmlFor="displayName">Email</label>
      <input
        id="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit" className="modal-button">
        Reset Password
      </button>
    </form>
  );
};

export default DisplayNameModal;
