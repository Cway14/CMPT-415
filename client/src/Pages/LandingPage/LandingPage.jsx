import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import LoginModalTemplate from "../../components/LoginModal/LoginModalTemplate";
import "./LandingPage.css";

const LandingPage = ({user, setUser}) => {

  const [modal, setModal] = useState();

  const auth = getAuth();
  const navigate = useNavigate();

  async function createUser(credentials){
    const { email, password } = credentials;
    try {
      // create user in firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user)

      // create user in database with corresponding firebase_uid
      const response = await fetch(process.env.REACT_APP_API + "/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": user.displayName, "firebase_uid": user.uid }),
      });

      navigate("/play")
    } catch (error) {
      console.log(error);
    }
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
        {!user &&
          <>
            <button className="button-large" onClick={() => showLoginModal()}>
              Login
            </button>
            <button className="button-link" onClick={() => showSignUpModal()}>
              Sign up
            </button>
          </>
        }
        {user &&
          <button className="button-large" onClick={() => navigate("/play")}>
            Play
          </button>
        }
      </div>
      {modal}
    </div>
  );
};

export default LandingPage;
