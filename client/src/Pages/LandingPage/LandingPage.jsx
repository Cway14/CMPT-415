import React, { useState } from "react";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/LoginModal/SignUpModal/SignUpModal";
import "./LandingPage.css";

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="landingPageContainer">
      <div
        className={`modal landingPage ${
          showLoginModal || showSignUpModal ? "hidden" : ""
        }`}
      >
        <h1>
          Prince's <br /> Grand Escape
        </h1>
        <button
          className="button-large"
          onClick={() => setShowLoginModal(true)}
        >
          Login
        </button>
        <button
          className="button-link"
          onClick={() => setShowSignUpModal(true)}
        >
          Sign up
        </button>
      </div>
      <LoginModal
        showModal={showLoginModal}
        hideModal={() => setShowLoginModal(false)}
      />
      <SignUpModal
        showModal={showSignUpModal}
        hideModal={() => setShowSignUpModal(false)}
      />
    </div>
  );
};

export default LandingPage;
