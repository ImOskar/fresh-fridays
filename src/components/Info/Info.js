import React from "react";
import { getLoginPath } from "../../utils/spotifyApi";
import SvgButton from "../SvgButton/SvgButton";
import "./Info.styles.css";

const Info = ({ isLoggedIn }) => {
  return (
    <div className="info">
      <p>
        First:
        <a href={getLoginPath()} className="spotify-login spotify-btn">
          {!isLoggedIn ? "Log in to Spotify" : "You're logged in!"}
        </a>
      </p>
      <p>
        <SvgButton
          classes="plist btn md"
          title="Playlist"
          icon="bars"
          mask="play"
        />{" "}
        To open and close playlist.
      </p>
      <p>
        <SvgButton
          classes="add btn md"
          title="Open tracklist"
          icon="list-alt"
        />{" "}
        To open tracklist.
      </p>
      <p>
        <SvgButton
          classes="add btn md"
          title="Add to playlist"
          icon="plus-circle"
        />{" "}
        To add a song to playlist.
      </p>
      <p>
        <SvgButton classes="play btn md" title="Play" icon="play-circle" /> To
        play a preview.
      </p>
    </div>
  );
};

export default Info;
