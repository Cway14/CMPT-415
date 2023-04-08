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
                <AuthProvider>
                    <LeverProvider>
                        <PlayerProvider>
                            <DialogProvider>
                                <App />
                            </DialogProvider>
                        </PlayerProvider>
                    </LeverProvider>
                </AuthProvider>
            </NotificationProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
