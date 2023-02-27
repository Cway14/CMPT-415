import React from "react";
import LoginModalTemplate from "./LoginModalTemplate";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginModal = (props) => {

  const auth = getAuth();
  function signIn(credentials) {
    const { email, password } = credentials;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("Signed in as: " + user.email)
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("ERROR: ", errorMessage)
      });
  }
  return (
    <LoginModalTemplate
      submitButtonText="Login"
      submitButtonAction={(credentials) => signIn(credentials)}
      headerImage="crown"
      showModal={props.showModal}
      hideModal={props.hideModal}
    />
  );
};

export default LoginModal;
