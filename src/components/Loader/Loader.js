import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "./Loader.styles.css";

const Loader = () => {
  return (
    <div className="loader">
      <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
    </div>
  );
};

export default Loader;
