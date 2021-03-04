import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faListAlt,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import "./Release.styles.css";

const Release = ({
  artist,
  title,
  image,
  url,
  uri,
  preview,
  tracks,
  handleAdd,
  handleToggle,
  handlePreview,
  playing,
  album,
}) => {
  return (
    <div className="album">
      <div className="img-hov">
        <img className="album-img" alt="album" src={image} />
        <div className="album-link">
          <a className="link-btn" title="Open in Spotify" href={url}>
            <FontAwesomeIcon className="spotify-link" icon={faSpotify} />
          </a>
          {album === "album" ? (
            <button
              className="link-btn"
              title="Open tracklist"
              onClick={() => handleToggle({ artist, title, tracks: tracks })}
            >
              <FontAwesomeIcon icon={faListAlt} />
            </button>
          ) : preview ? (
            <>
              <button
                onClick={() => handlePreview(preview)}
                title="Play"
                className={
                  preview === playing.url && playing.play
                    ? "link-btn pulse-btn"
                    : "link-btn"
                }
              >
                <FontAwesomeIcon
                  className="play-link"
                  icon={
                    preview === playing.url && playing.play
                      ? faPauseCircle
                      : faPlayCircle
                  }
                />
              </button>
              <button
                className="link-btn"
                title="Add to playlist"
                onClick={() => handleAdd(artist, title, uri)}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </>
          ) : (
            <button
              className="link-btn"
              title="Add to playlist"
              onClick={() => handleAdd(artist, title, uri)}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          )}
        </div>
      </div>
      <div className="album-name">
        <span className="album-title">{title}</span>
        <span className="album-artist">{artist}</span>
      </div>
    </div>
  );
};

export default Release;
