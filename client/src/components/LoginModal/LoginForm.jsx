import React from "react";
import { useFormik } from "formik";

const LoginForm = (props) => {
  const { submitButtonText, submitButtonAction, forgotPasswordAction } = props;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => submitButtonAction(values),
  });
  return (
    <form onSubmit={formik.handleSubmit} className="center">
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
