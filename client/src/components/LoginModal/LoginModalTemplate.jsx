// USED AS TEMPLATE BY BOTH LOGIN AND SIGNUP MODALS
import React from "react";

import { useFormik } from 'formik';

import crown from "../../assets/crown.png";
import "./LoginModal.css";

const Form = (props) => {
  const { submitButtonText, submitButtonAction } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => submitButtonAction(values)
  });
  return (
    <form onSubmit={formik.handleSubmit} className="loginModal">
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

      <button type="submit">{submitButtonText}</button>
    </form>
  );
};
  
const LoginModalTemplate = (props) => {
  const { headerImage, showModal, hideModal, ...rest } = props;

  let header = <img src={crown} className="crown" alt="crown" />;

  if (headerImage === "signUp") {
    header = <h2 className="signUpHeader signUp">Sign Up</h2>;
  }

  const closeModal = (e) => { 
    if (e.target.className.includes("loginModalContainer modal")) {
      hideModal();
    }
  };

  return (
    <div
      className={`loginModalContainer modal ${showModal ? "" : "hidden"}`}
      onClick={(e) => closeModal(e)} // close modal if user clicks outside of modal
    >
      {header}
      <Form {...rest} />
    </div>
  );
};

export default LoginModalTemplate;
