// USED AS TEMPLATE BY BOTH LOGIN AND SIGNUP MODALS
import React from "react";

import crown from "../../assets/crown.png";
import LoginForm from "./LoginForm";
import "./LoginModal.css";
  
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
      <LoginForm {...rest} />
    </div>
  );
};

export default LoginModalTemplate;
