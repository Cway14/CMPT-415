import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import "./LandingPage.css";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";

const LandingPage = () => {
  const [modal, setModal] = useState();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const loginModal = <LoginModal setModal={setModal} />;
  const signUpModal = <SignUpModal setModal={setModal} />;

  return (
    <div className="landingPageContainer">
      <div className={`modal landingPage ${modal ? "hidden" : ""}`}>
        <h1>
          Prince's <br /> Grand Escape
        </h1>
        {!currentUser && (
          <>
            <button
              className="button-large"
              onClick={() => setModal(loginModal)}
            >
              Login
            </button>
            <button
              className="button-link"
              onClick={() => setModal(signUpModal)}
            >
              Sign up
            </button>
          </>
        )}
        {currentUser && (
          <button className="button-large" onClick={() => navigate("/play")}>
            Play
          </button>
        )}
      </div>
      {modal}
    </div>
  );
};

export default LandingPage;
