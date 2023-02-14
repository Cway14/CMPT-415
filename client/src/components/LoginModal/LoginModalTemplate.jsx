// USED AS TEMPLATE BY BOTH LOGIN AND SIGNUP MODALS
import React from "react";

import crown from "../../assets/crown.png";
import "./LoginModal.css";

const LoginModalTemplate = (props) => {
  let header = <img src={crown} className="crown" alt="crown" />;

  if (props.headerImage === "signUp") {
    header = <h2 className="signUpHeader signUp">Sign Up</h2>;
  }
  return (
    <div
      className={`loginModalContainer modal ${props.showModal ? "" : "hidden"}`}
    >
      {header}
      <div className="loginModal">
        <h2>Username:</h2>
        <input type="text" name="username" />
        <h2>Password:</h2>
        <input type="password" name="password" />
        <button onClick={props.submitButtonAction}>
          {props.submitButtonText}
        </button>
      </div>
    </div>
  );
};

export default LoginModalTemplate;
