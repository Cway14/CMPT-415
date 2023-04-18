import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useNotification } from "../../context/NotificationContext";

import LoginForm from "../LoginModal/LoginForm";
import DisplayNameModal from "../SignUpModal/DisplayNameModal";
import "../LoginModal/LoginModal.css";

const SignUpModal = (props) => {
    const { setModal } = props;
    const [form, setForm] = useState();
    const navigate = useNavigate();
    const { signup, setUserProfile } = useAuth();
    const { showNotification } = useNotification();

    const signUpForm = (
        <LoginForm
            submitButtonText="Sign up"
            submitButtonAction={(credentials) =>
                showDisplayNameModal(credentials)
            }
        />
    );
    useEffect(() => {
        setForm(signUpForm);
    }, []);

    const closeModal = (e) => {
        if (e.target.className.includes("loginModalContainer modal")) {
            setModal(null);
        }
    };

    async function createUser(credentials) {
        const { email, password, displayName, profilePic } = credentials;

        try {
            // create user in firebase
            const userCredential = await signup(email, password);
            const user = userCredential.user;

            // create user in database with corresponding firebase_uid
            const response = await fetch(
                process.env.REACT_APP_API + "/users/new-user",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: displayName,
                        firebase_uid: user.uid,
                        profile_pic: profilePic,
                    }),
                }
            );
            setUserProfile(await response.json());

            navigate("/play");
        } catch (error) {
            console.log(error.message);
            showNotification(error.message, "error");
            // go back to login form
            setForm(signUpForm);
        }
    }

    function showDisplayNameModal(credentials) {
        setForm(
            <DisplayNameModal
                submitButtonAction={(values) =>
                    createUser({ ...credentials, ...values })
                }
            />
        );
    }

    return (
        <div
            className={`loginModalContainer modal`}
            onClick={(e) => closeModal(e)} // close modal if user clicks outside of modal
        >
            <h2 className="signUpHeader signUp">Sign Up</h2>
            <div className="loginModal">{form}</div>
        </div>
    );
};

export default SignUpModal;
