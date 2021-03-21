import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimes,
  faPlayCircle,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Tracklist.styles.css";

const Tracklist = ({
  list,
  handleAdd,
  handleToggle,
  handlePreview,
  isPlaying,
  playingUrl,
}) => {
  const artist = list.artist;
  return (
    <div className="tracklist">
      <div className="tracklist-header">
        <button
          onClick={() => handleToggle({})}
          className="btn close-container"
        >
          <FontAwesomeIcon className="close-btn" icon={faTimes} />
        </button>
        <span className="tracklist-header-title title-margin">
          {artist + ":"}
        </span>
        <span className="tracklist-header-title">{list.title}</span>
      </div>
      <table className="tracklist-table">
        <tbody>
          {list.tracks.map((track) => {
            return (
              <tr className="tracklist-item" key={track.uri}>
                <td className="tracklist-title">{track.title}</td>
                <td className="tracklist-play">
                  {track.preview && (
                    <button
                      onClick={() => handlePreview(track.preview)}
                      className={
                        track.preview === playingUrl && isPlaying
                          ? "btn pulse-btn"
                          : "btn"
                      }
                    >
                      <FontAwesomeIcon
                        className="play-svg"
                        icon={
                          track.preview === playingUrl && isPlaying
                            ? faPauseCircle
                            : faPlayCircle
                        }
                      />
                    </button>
                  )}
                </td>
                <td className="tracklist-add">
                  <button
                    onClick={() => handleAdd(artist, track.title, track.uri)}
                    className="btn"
                  >
                    <FontAwesomeIcon className="add-svg" icon={faPlusCircle} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tracklist;
