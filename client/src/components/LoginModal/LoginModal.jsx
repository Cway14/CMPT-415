import React from "react";
import LoginModalTemplate from "./LoginModalTemplate";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginModal = ({showModal, hideModal, setUser}) => {
  const navigate = useNavigate();

  const auth = getAuth();
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
  return (
    <LoginModalTemplate
      submitButtonText="Login"
      submitButtonAction={(credentials) => signIn(credentials)}
      headerImage="crown"
      showModal={showModal}
      hideModal={hideModal}
    />
  );
};

export default LoginModal;
