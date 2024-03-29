import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import { useNotification } from "../context/NotificationContext";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [userProfile, setUserProfile] = useState({
        name: "John Doe",
        score: 0,
        profile_picture: "",
    });
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setUserProfile({
            name: "John Doe",
            score: 0,
            profile_picture: "",
        });
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function reauthenticate(password) {
        const credential = EmailAuthProvider.credential(
            currentUser.email,
            password
        );
        return reauthenticateWithCredential(currentUser, credential);
    }

    function updateUserPassword(password) {
        return updatePassword(currentUser, password);
    }

    async function getUserProfile() {
        // try {
        const url =
            process.env.REACT_APP_API +
            "/users?id=" +
            currentUser.uid +
            "&name=" +
            currentUser.displayName;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setUserProfile(data);
        // } catch (error) {
        //     console.log("error: ", error);
        //     showNotification("An error occurred. Please try again.", "error");
        // }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        if (userProfile && userProfile.firebase_uid === currentUser.uid) return;
        getUserProfile();
    }, [currentUser]);

    const value = {
        currentUser,
        userProfile,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updateUserPassword,
        reauthenticate,
        getUserProfile,
        setUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
