import React from "react";
import { getLoginPath } from "../../utils/spotifyApi";
import "./Header.styles.css";
import Info from "../Info/Info";

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
      <Info />
    </header>
  );
};

export default Header;
