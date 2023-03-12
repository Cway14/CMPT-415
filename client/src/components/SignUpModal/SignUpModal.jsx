import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import LoginForm from "../LoginModal/LoginForm";
import DisplayNameModal from "../SignUpModal/DisplayNameModal";
import crown from "../../assets/crown.png";
import "../LoginModal/LoginModal.css";

const SignUpModal = (props) => {
    const { hideModal } = props;
    const [form, setForm] = useState();
    const navigate = useNavigate();
    const { signup } = useAuth();

    useEffect(() => {
        setForm(
            <LoginForm
                submitButtonText="Sign up"
                submitButtonAction={(credentials) => showDisplayNameModal(credentials)}
                />
        )
    }, []);

  const closeModal = (e) => {
    if (e.target.className.includes("loginModalContainer modal")) {
      hideModal();
    }
  };
    
  async function createUser(credentials){
    const { email, password, displayName, profilePic } = credentials;
    
    try {
      // create user in firebase
      const userCredential = await signup(email, password)
      const user = userCredential.user;

      // create user in database with corresponding firebase_uid
      await fetch(process.env.REACT_APP_API + "/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": displayName, "firebase_uid": user.uid, "profile_pic": profilePic }),
      });

      navigate("/play")
    } catch (error) {
      console.log(error);
    }
  }
    
  function showDisplayNameModal(credentials) {
    setForm(<DisplayNameModal
      submitButtonText="Finish Sign up"
      submitButtonAction={(values) => createUser({...credentials, ...values})}
    />)
  }

  return (
    <div
      className={`loginModalContainer modal`}
      onClick={(e) => closeModal(e)} // close modal if user clicks outside of modal
    >
      <h2 className="signUpHeader signUp">Sign Up</h2>
          <div className="loginModal">
              {form}
      </div>
    </div>
  );
};

export default SignUpModal;
