// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_ApiKey,
  authDomain: process.env.REACT_APP_FIREBASE_AuthDomain,
  projectId:process.env.REACT_APP_FIREBASE_ProjectId,
  storageBucket: process.env.REACT_APP_FIREBASE_StorageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MessagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_AppId
};

// Initialize Firebase
export const initializeFirebase = () => initializeApp(firebaseConfig);