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
  clickHandler,
  albumClick,
  previewClick,
  playing,
}) => {
  const artist = list.artist;
  return (
    <div className="tracklist">
      <div className="tracklist-header">
        <button onClick={() => albumClick()} className="btn close-container">
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
                      onClick={() => previewClick(track.preview)}
                      className={
                        track.preview === playing.url && playing.play
                          ? "btn pulse-btn"
                          : "btn"
                      }
                    >
                      <FontAwesomeIcon
                        className="play-svg"
                        icon={
                          track.preview === playing.url && playing.play
                            ? faPauseCircle
                            : faPlayCircle
                        }
                      />
                    </button>
                  )}
                </td>
                <td className="tracklist-add">
                  <button
                    onClick={() => clickHandler(artist, track.title, track.uri)}
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
