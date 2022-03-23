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
        To open and close playlist:
        <SvgButton
          classes="plist btn md"
          title="Playlist"
          icon="bars"
          mask="play"
        />{" "}
      </p>
      <p>
        To open tracklist:
        <SvgButton
          classes="btn-col-white btn md"
          title="Open tracklist"
          icon="list-alt"
        />{" "}
      </p>
      <p>
        To add a song to playlist:
        <SvgButton
          classes="btn-col-white btn md"
          title="Add to playlist"
          icon="plus-circle"
        />{" "}
      </p>
      <p>
        To play a preview:
        <SvgButton
          classes="btn-col-white btn md"
          title="Play"
          icon="play-circle"
        />
      </p>
    </div>
  );
};

export default Info;
