import React from "react";
import LoginModalTemplate from "../LoginModalTemplate";

const SignUpModal = (props) => {
  return (
    <LoginModalTemplate
      submitButtonText="Sign up"
      submitButtonAction={() => console.log("Sign up button clicked")}
      headerImage="signUp"
      showModal={props.showModal}
      hideModal={props.hideModal}
    />
  );
};

export default SignUpModal;
