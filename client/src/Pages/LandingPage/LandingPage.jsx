import React, { useState } from "react";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/LoginModal/SignUpModal/SignUpModal";
import "./LandingPage.css";

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="landingPageContainer">
      <div className="modal landingPage">
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
        <LoginModal
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
        />
        <SignUpModal
          showModal={showSignUpModal}
          setShowModal={setShowSignUpModal}
        />
      </div>
    </div>
  );
};

export default LandingPage;
