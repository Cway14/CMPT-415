import React from "react";
import LoginModalTemplate from "./LoginModalTemplate";

const LoginModal = (props) => {
  return (
    <LoginModalTemplate
      submitButtonText="Login"
      submitButtonAction={() => console.log("Login button clicked")}
      headerImage="crown"
      showModal={props.showModal}
    />
  );
};

export default LoginModal;
