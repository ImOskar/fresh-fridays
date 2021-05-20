import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SvgButton.styles.css";

const SvgButton = ({ classes, title, click, icon, mask }) => {
  return (
    <button className={classes} title={title} onClick={click}>
      <FontAwesomeIcon icon={icon} mask={mask} />
    </button>
  );
};

export default SvgButton;
