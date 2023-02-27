import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import LoginModalTemplate from "../../components/LoginModal/LoginModalTemplate";
import "./LandingPage.css";

const LandingPage = ({setUser}) => {

  const [modal, setModal] = useState();

  const auth = getAuth();
  const navigate = useNavigate();

  function createUser(credentials){
    const { email, password } = credentials;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setUser(user)
      navigate("/play")
    })
    .catch((error) => {

    });
  }

  function signIn(credentials) {
    const { email, password } = credentials;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user)
        navigate("/play")
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("ERROR: ", errorMessage)
      });
  }

  function showLoginModal() {
    setModal(
      <LoginModalTemplate
        submitButtonText="Login"
        submitButtonAction={(credentials) => signIn(credentials)}
        headerImage="crown"
        hideModal={() => setModal()}
      />
    );
  }

  function showSignUpModal() {
    setModal(
      <LoginModalTemplate
        submitButtonText="Sign up"
        submitButtonAction={(credentials) => createUser(credentials)}
        headerImage="signUp"
        hideModal={() => setModal()}
      />
    );
  }


  return (
    <div className="landingPageContainer">
      <div
        className={`modal landingPage ${modal ? "hidden" : ""}`}
      >
        <h1>
          Prince's <br /> Grand Escape
        </h1>
        <button
          className="button-large"
          onClick={() => showLoginModal()}
        >
          Login
        </button>
        <button
          className="button-link"
          onClick={() => showSignUpModal()}
        >
          Sign up
        </button>
      </div>
      {modal}
    </div>
  );
};

export default LandingPage;
