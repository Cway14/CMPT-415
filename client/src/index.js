import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { DialogProvider } from "context/DialogContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DialogProvider>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </DialogProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
