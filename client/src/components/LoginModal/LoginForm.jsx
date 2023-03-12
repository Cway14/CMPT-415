import React from "react";
import { useFormik } from "formik";

import { useNotification } from "../../context/NotificationContext";

const LoginForm = (props) => {
  const { submitButtonText, submitButtonAction, forgotPasswordAction } = props;
  const { showNotification } = useNotification();

  const submitAction = (values) => {
    // validate values
    if (!values.email || !values.password) {
      showNotification("Please fill out all fields.", "error");
      return;
    }

    submitButtonAction(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => submitAction(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="center-children">
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        minLength="6"
      />
      {forgotPasswordAction && (
        <button className="button-link" onClick={forgotPasswordAction}>
          Forgot Password?
        </button>
      )}
      <button type="submit" className="modal-button">
        {submitButtonText}
      </button>
    </form>
  );
};

export default LoginForm;
