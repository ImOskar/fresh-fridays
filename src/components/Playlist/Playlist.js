import React from "react";
import { getFridayNumber } from "../../utils/functions";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import "./Playlist.styles.css";

const Playlist = ({ handleSave, handleDelete, tracks }) => {
  return (
    <div className="playlist">
      <div className="playlist-heading">
        <span className="playlist-name">[Fresh]Friday#{getFridayNumber()}</span>
        <button onClick={handleSave} className="spotify-btn">
          Save playlist to Spotify
        </button>
      </div>
      {!tracks.length ? (
        <h1 className="empty-playlist">
          Your playlist is empty. Click the plus sign of a release to add songs.
        </h1>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Artist</td>
            </tr>
          </thead>
          <tbody className="table-body">
            {tracks.map((track) => {
              return (
                <PlaylistItem
                  clickHandler={handleDelete}
                  key={track.uri}
                  {...track}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Playlist;
