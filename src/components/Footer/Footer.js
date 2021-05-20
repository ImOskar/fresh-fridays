import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "./Footer.styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <a href="#content" className="scrollup">
        <FontAwesomeIcon icon={faChevronUp} />
      </a>
      <div className="footer-text">
        <p>Sourced from r/hiphopheads.</p>
        <p>Credit to u/TheRoyalGodfrey and u/KHDTX13. </p>
        <p>
          Photo by
          <a href="https://www.pexels.com/@suzyhazelwood"> Suzy Hazelwood </a>
          from
          <a href="https://www.pexels.com/"> Pexels. </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
