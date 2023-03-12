import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"
import LoginModalTemplate from "../../components/LoginModal/LoginModalTemplate";
import "./LandingPage.css";
import LoginForm from "../../components/LoginModal/LoginForm";
import DisplayNameModal from "../../components/SignUpModal/DisplayNameModal";

const LandingPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState();

  const { signup, login, currentUser } = useAuth()

  const navigate = useNavigate();

  async function createUser(credentials){
    const { email, password, displayName, profilePic } = credentials;
    
    try {
      // create user in firebase
      const userCredential = await signup(email, password)
      const user = userCredential.user;

      // create user in database with corresponding firebase_uid
      await fetch(process.env.REACT_APP_API + "/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": displayName, "firebase_uid": user.uid, "profile_pic": profilePic }),
      });

      navigate("/play")
    } catch (error) {
      console.log(error);
    }
  }

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

  function showLoginModal() {
    setForm(<LoginForm
      submitButtonText="Login"
      submitButtonAction={(credentials) => signIn(credentials)}
    />)

    setShowModal(true);
  }

  function showDisplayNameModal(credentials) {
    setForm(<DisplayNameModal
      submitButtonText="Finish Sign up"
      submitButtonAction={(values) => createUser({...credentials, ...values})}
    />)

    setShowModal(true);
  }

  function showSignUpModal() {
    setForm(<LoginForm
      submitButtonText="Sign up"
      submitButtonAction={(credentials) => showDisplayNameModal(credentials)}
    />)

    setShowModal(true);
  }


  return (
    <div className="landingPageContainer">
      <div
        className={`modal landingPage ${showModal ? "hidden" : ""}`}
      >
        <h1>
          Prince's <br /> Grand Escape
        </h1>
        {!currentUser &&
          <>
            <button className="button-large" onClick={() => showLoginModal()}>
              Login
            </button>
            <button className="button-link" onClick={() => showSignUpModal()}>
              Sign up
            </button>
          </>
        }
        {currentUser &&
          <button className="button-large" onClick={() => navigate("/play")}>
            Play
          </button>
        }
      </div>
      {showModal &&
        <LoginModalTemplate
        form={form}
        hideModal={() => setShowModal(false)}
      />}
    </div>
  );
};

export default LandingPage;
