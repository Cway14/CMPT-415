import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { DialogProvider } from "context/DialogContext";
import { PlayerProvider } from "context/PlayerContext";
import { LeverProvider } from "context/LeverContext";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <NotificationProvider>
                <LeverProvider>
                    <PlayerProvider>
                        <DialogProvider>
                            <AuthProvider>
                                <App />
                            </AuthProvider>
                        </DialogProvider>
                    </PlayerProvider>
                </LeverProvider>
            </NotificationProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
