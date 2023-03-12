import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import LoginForm from "../LoginModal/LoginForm";
import crown from "../../assets/crown.png";
import "./LoginModal.css";

const LoginModal = (props) => {
    const { hideModal } = props;
    const navigate = useNavigate();
    const { login } = useAuth();


  const closeModal = (e) => { 
    if (e.target.className.includes("loginModalContainer modal")) {
      hideModal();
    }
  };
    
  async function signIn(credentials) {
    const { email, password } = credentials;

    login (email, password)
      .then(() => {
        navigate("/play")
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("ERROR: ", errorMessage)
      });
  }

  return (
    <div
      className={`loginModalContainer modal`}
      onClick={(e) => closeModal(e)} // close modal if user clicks outside of modal
    >
          <img src={crown} className="crown" alt="crown" />
          <div className="loginModal">
          <LoginForm
      submitButtonText="Login"
      submitButtonAction={(credentials) => signIn(credentials)}
    />
      </div>
    </div>
  );
};

export default LoginModal;