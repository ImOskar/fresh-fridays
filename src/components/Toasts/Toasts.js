import React from "react";
import { useSelector } from "react-redux";
import Toast from "../Toast/Toast";
import "./Toasts.styles.css";

const Toasts = () => {
  const toasts = useSelector((state) => state.toast);

  return (
    <div className="toast-container">
      {!toasts.length
        ? null
        : toasts.map((toast) => {
            return <Toast key={toast.id} {...toast} />;
          })}
    </div>
  );
};

export default Toasts;
