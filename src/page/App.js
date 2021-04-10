import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import ContentHeader from "../components/ContentHeader/ContentHeader";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import Playlist from "../components/Playlist/Playlist";
import ReleaseList from "../components/ReleaseList/ReleaseList";
import Toast from "../components/Toast/Toast";
import Tracklist from "../components/Tracklist/Tracklist";
import useAudioPreview from "../hooks/useAudioPreview";
import useReleaseApi from "../hooks/useReleaseApi";
import useToken from "../hooks/useToken";
import savePlaylist from "../utils/spotifyApi";
import * as tc from "../utils/constants";
import "./App.css";

function App() {
  const { isLoggedIn } = useToken();
  const [{ isPlaying, url, audio }, setIsPlaying, setUrl] = useAudioPreview();
  const [playlist, setPlaylist] = useState([]);
  const [playlistToggle, setPlaylistToggle] = useState(false);
  const [{ releases, isLoading, isError }, setQuery] = useReleaseApi();
  const [releaseType, setReleaseType] = useState("album");
  const [tracklist, setTracklist] = useState({});
  const [tracklistToggle, setTracklistToggle] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    show: false,
    type: "",
    title: "",
  });

  const fetchReleases = (query) => {
    setQuery(query);
  };

  const handlePlaylistToggle = () => {
    setPlaylistToggle(!playlistToggle);
  };

  const handleTracklistToggle = (albumItem) => {
    setTracklistToggle(!tracklistToggle);
    setTracklist(albumItem);
  };

  const handleAddToPlaylist = (name, title, uri) => {
    if (playlist.some((item) => item.uri === uri)) {
      displayToast(name + " - " + title, tc.DUP_MESSAGE, tc.DUPLICATE);
      return;
    }
    let playlistItem = {
      artist: name,
      title,
      uri,
    };
    setPlaylist((playlist) => [...playlist, playlistItem]);
  };

  const handleDeleteFromPlaylist = (uri) => {
    setPlaylist((playlist) => playlist.filter((item) => item.uri !== uri));
  };

  const handleSavePLaylist = () => {
    if (!isLoggedIn)
      return displayToast(tc.LOGIN_MESSAGE, tc.PL_ERROR_MESSAGE, tc.ERROR);
    if (!playlist.length)
      return displayToast(tc.PL_EMPTY_MESSAGE, tc.PL_ERROR_MESSAGE, tc.ERROR);
    saveToSpotify();
  };

  const saveToSpotify = () => {
    let uris = playlist.map((item) => item.uri);
    let token = localStorage.getItem("token");
    savePlaylist(token, uris).then((res) => {
      if (res !== "error") {
        displayToast("", tc.PL_SUCCESS_MESSAGE, tc.SUCCESS);
      } else displayToast(tc.LOGIN_MESSAGE, tc.PL_ERROR_MESSAGE, tc.ERROR);
    });
    handlePlaylistToggle();
    setPlaylist([]);
  };

  const handlePlayPreview = (previewUrl) => {
    setIsPlaying(!isPlaying);
    if (url !== previewUrl) {
      audio.setAttribute("src", previewUrl);
      setUrl(previewUrl);
    }
  };

  const handleSelectReleaseType = (releaseType) => {
    setReleaseType(releaseType);
  };

  const displayToast = (message, title, type) => {
    setToast({ message: message, show: true, type: type, title: title });
    setTimeout(() => {
      setToast({ message: "", show: false, type: "", title: "" });
    }, 3000);
  };

  return (
    <div className="container">
      <Header />
      <main id="content">
        <ContentHeader
          getReleases={fetchReleases}
          selectReleaseType={handleSelectReleaseType}
        />
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <h1 className="error">Error loading releases</h1>
        ) : (
          <ReleaseList
            handleAdd={handleAddToPlaylist}
            handleToggle={handleTracklistToggle}
            handlePreview={handlePlayPreview}
            isPlaying={isPlaying}
            playingUrl={url}
            releases={releases}
            releaseType={releaseType}
          />
        )}
        {playlistToggle && (
          <Playlist
            handleDelete={handleDeleteFromPlaylist}
            handleSave={handleSavePLaylist}
            tracks={playlist}
          />
        )}
        <button
          onTouchStart={() => {}}
          onClick={handlePlaylistToggle}
          className="playlist-button btn"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {tracklistToggle && (
          <Tracklist
            handleAdd={handleAddToPlaylist}
            handleToggle={handleTracklistToggle}
            handlePreview={handlePlayPreview}
            isPlaying={isPlaying}
            playingUrl={url}
            list={tracklist}
          />
        )}
        {toast.show && <Toast {...toast} />}
      </main>
      <footer className="footer">
        <a href="#content" className="scrollup">
          <FontAwesomeIcon icon={faChevronUp} />
        </a>
        <div className="footer-text">
          <p>Sourced from r/hiphopheads.</p>
          <p>Credit to u/TheRoyalGodfrey and u/KHDTX13. </p>
          <p>
            Photo by
            <a href="https://www.pexels.com/@suzyhazelwood"> Suzy Hazelwood </a>
            from
            <a href="https://www.pexels.com/"> Pexels. </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
