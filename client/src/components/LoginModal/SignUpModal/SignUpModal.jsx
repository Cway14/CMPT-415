import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginModalTemplate from "../LoginModalTemplate";

const SignUpModal = ({showModal, hideModal, setUser}) => {
  const navigate = useNavigate();


  const auth = getAuth();
  function createUser(credentials){
    const { email, password } = credentials;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setUser(user)
      navigate("/play")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  
  return (
    <LoginModalTemplate
      submitButtonText="Sign up"
      submitButtonAction={(credentials) => createUser(credentials)}
      headerImage="signUp"
      showModal={showModal}
      hideModal={hideModal}
    />
  );
};

export default SignUpModal;
