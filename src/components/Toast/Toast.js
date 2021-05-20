import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Toast.styles.css";

const Toast = ({ message, title, type }) => {
  const getIconType = () => {
    switch (type) {
      case "duplicate":
        return faClone;
      case "error":
        return faExclamationCircle;
      case "success":
        return faCheckCircle;
      default:
        return null;
    }
  };

  return (
    <div className="toast-box">
      <div className="notification">
        <div className="notification-icon">
          <FontAwesomeIcon className="link-margin" icon={getIconType()} />
        </div>
        <div className="notification-text">
          <span className="notification-title">{title}</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
