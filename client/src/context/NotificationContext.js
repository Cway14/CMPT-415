import React, { useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = React.createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState();

  function showNotification(message, type = "success") {
    setNotification({ message, type });
  }

  function hideNotification() {
    setNotification(null);
  }

  const value = {
    notification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      <Notification />
      {children}
    </NotificationContext.Provider>
  );
}
