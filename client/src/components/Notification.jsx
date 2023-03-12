import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNotification } from "../context/NotificationContext";

const Notification = (props) => {
  const { notification, hideNotification, isOpen } = useNotification();
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => hideNotification()}
      message={notification?.message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={notification?.type}>{notification?.message}</Alert>
    </Snackbar>
  );
};

export default Notification;
