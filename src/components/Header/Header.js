import React from "react";
import { getLoginPath } from "../../utils/spotifyApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Header.styles.css";

const Header = ({ isLoggedIn }) => {
  return (
    <header id="header" className="header">
      <div className="bg-gradient"></div>
      <div className="caption">
        <h1 className="title">[FRESH] Fridays</h1>
        <span className="subtitle">Discover the latest hip-hop releases</span>
      </div>
      <a href={getLoginPath()} className="spotify-login spotify-btn selectable">
        {!isLoggedIn ? "Log in to Spotify" : "You're logged in!"}
      </a>
      <span className="chevron selectable">
        <a href="#content">
          <FontAwesomeIcon icon={faChevronDown} />
        </a>
      </span>
    </header>
  );
};

export default Header;
