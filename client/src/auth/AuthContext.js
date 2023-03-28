import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

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

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    async function getUserProfile() {
        try {
            const url = process.env.REACT_APP_API + "/users/" + currentUser.uid;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.log("error: ", error);
        }
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
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
