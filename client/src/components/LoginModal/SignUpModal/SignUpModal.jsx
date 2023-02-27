import React from "react";
import LoginModalTemplate from "../LoginModalTemplate";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpModal = (props) => {


  const auth = getAuth();
  function createUser(credentials){
    const { email, password } = credentials;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  
  return (
    <LoginModalTemplate
      submitButtonText="Sign up"
      submitButtonAction={(credentials) => createUser(credentials)}
      headerImage="signUp"
      showModal={props.showModal}
      hideModal={props.hideModal}
    />
  );
};

export default SignUpModal;
