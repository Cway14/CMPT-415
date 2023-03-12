import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import ForgotPasswordModal from "../LoginModal/ForgotPasswordModal";
import LoginForm from "../LoginModal/LoginForm";
import crown from "../../assets/crown.png";
import "./LoginModal.css";

const LoginModal = (props) => {
  const { setModal } = props;
  const [form, setForm] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setForm(
      <LoginForm
        submitButtonText="Login"
        submitButtonAction={(credentials) => signIn(credentials)}
        forgotPasswordAction={() => showForgotPasswordForm()}
      />
    );
  }, []);

  const showForgotPasswordForm = () =>
    setForm(<ForgotPasswordModal setModal={setModal} />);

  const closeModal = (e) => {
    if (e.target.className.includes("loginModalContainer modal")) {
      setModal(null);
    }
  };

  async function signIn(credentials) {
    const { email, password } = credentials;

    login(email, password)
      .then(() => {
        navigate("/play");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("ERROR: ", errorMessage);
      });
  }

  return (
    <div
      className={`loginModalContainer modal`}
      onClick={(e) => closeModal(e)} // close modal if user clicks outside of modal
    >
      <img src={crown} className="crown" alt="crown" />
      <div className="loginModal">{form}</div>
    </div>
  );
};

export default LoginModal;
