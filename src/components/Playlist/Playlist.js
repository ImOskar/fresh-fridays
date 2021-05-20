import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePlaylistToSpotify } from "../../redux/playlist/playlist.actions";
import { getFridayNumber } from "../../utils/functions";
import Info from "../Info/Info";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import "./Playlist.styles.css";

const Playlist = ({ isLoggedIn }) => {
  const { tracks } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  return (
    <div className="playlist">
      <div className="playlist-heading">
        <span className="playlist-name">[Fresh]Friday#{getFridayNumber()}</span>
        <button
          onClick={() => dispatch(savePlaylistToSpotify(tracks))}
          className="spotify-btn"
        >
          Save playlist to Spotify
        </button>
      </div>
      {!tracks.length ? (
        <div className="playlist-info">
          <h1 className="empty-playlist">Your playlist is empty.</h1>
          <Info isLoggedIn={isLoggedIn} />
        </div>
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
              return <PlaylistItem key={track.uri} {...track} />;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Playlist;
