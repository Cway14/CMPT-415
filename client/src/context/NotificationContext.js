import React, { useContext, useState } from "react";
import Notification from "../components/Notification";
import { getUserFriendlyError } from "../utils/UserFriendlyErrors";

const NotificationContext = React.createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState();
  const [isOpen, setIsOpen] = useState(false);

  function showNotification(message, type = "success") {
    if (type === "error") message = getUserFriendlyError(message);
    setIsOpen(true);
    setNotification({ message, type });
  }

  function hideNotification() {
    setIsOpen(false);
  }

  const value = {
    notification,
    isOpen,
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
