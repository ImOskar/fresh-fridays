import React from "react";
import { getLoginPath } from "../../utils/spotifyApi";
import SvgButton from "../SvgButton/SvgButton";
import "./Info.styles.css";

const Info = () => {
  return (
    <div className="info">
      <div className="info-box">
        <SvgButton
          classes="btn-col-primary btn lg btn-head"
          title="Open in Spotify"
          icon={["fab", "spotify"]}
        />
        <h1>Log in to Spotify</h1>
        <p>
          {" "}
          <a href={getLoginPath()}>Log in</a> to your Spotify account so you can
          save your playlist for later.
        </p>
      </div>
      <div className="info-box">
        <SvgButton
          classes="btn-col-primary btn lg btn-head"
          title="Play"
          icon="play-circle"
        />
        <h1>Explore new music</h1>
        <p>
          Pick a friday and explore all the music. Listen to snippets of songs
          with the play button and add the ones you like to a playlist.
        </p>
      </div>
      <div className="info-box">
        <SvgButton
          classes="btn-col-primary btn lg btn-head"
          title="Playlist"
          icon="bars"
          mask="play"
        />
        <h1>Save your playlist</h1>
        <p>
          You can view, edit, and save your playlist so you can listen to it on
          your Spotify app.
        </p>
      </div>
    </div>
  );
};

export default Info;
