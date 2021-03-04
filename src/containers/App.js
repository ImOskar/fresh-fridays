import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Header from "../components/Header/Header";
import ReleaseList from "../components/ReleaseList/ReleaseList";
import Playlist from "../components/Playlist/Playlist";
import Tracklist from "../components/Tracklist/Tracklist";
import Toast from "../components/Toast/Toast";
import ContentHeader from "../components/ContentHeader/ContentHeader";
import Loader from "../components/Loader/Loader";
import savePlaylist from "../utils/spotifyApi";
import * as tc from "../utils/constants";
import * as util from "../utils/functions";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [releases, setReleases] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [tracklist, setTracklist] = useState(0);
  const [playlistToggle, setPlaylistToggle] = useState(false);
  const [tracklistToggle, setTracklistToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [releaseType, setReleaseType] = useState("album");
  const [toast, setToast] = useState({
    message: "",
    show: false,
    type: "",
    title: "",
  });
  const [preview, setPreview] = useState({
    url: "",
    audio: new Audio(""),
    play: "",
  });

  useEffect(() => {
    fetchReleases(util.getFridayNumber());
  }, []);

  useEffect(() => {
    if (checkToken()) return;
    let searchParams = new URLSearchParams(window.location.hash);
    if (searchParams.has("#access_token")) {
      let userToken = searchParams.get("#access_token");
      addToken(userToken);
    }
    window.location.hash = "";
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    let tokenExpires = parseInt(localStorage.getItem("expires"));
    let timeNow = new Date().getTime();
    const timeout = setTimeout(() => {
      checkToken();
    }, tokenExpires - timeNow);
    return () => clearTimeout(timeout);
  }, [isLoggedIn]);

  useEffect(() => {
    const onPlayEnded = () => {
      preview.audio.setAttribute("src", "");
      setPreview({ ...preview, url: "", play: false });
    };
    preview.audio.addEventListener("ended", onPlayEnded);
    preview.play ? preview.audio.play() : preview.audio.pause();
    return () => {
      preview.audio.removeEventListener("ended", onPlayEnded);
    };
  }, [preview]);

  const addToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expires", new Date().getTime() + 3600000);
    setIsLoggedIn(true);
  };

  const checkToken = () => {
    if (localStorage.getItem("token") !== null) {
      let tokenExpires = parseInt(localStorage.getItem("expires"));
      let timeNow = new Date().getTime();
      if (tokenExpires > timeNow) {
        setIsLoggedIn(true);
        return true;
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        setIsLoggedIn(false);
        return false;
      }
    }
    return false;
  };

  const fetchReleases = async (number) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios(
        process.env.REACT_APP_API_URL + `fri${number}2021`
      );
      const data = result.data.releases;
      setReleases(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: " + error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handlePlaylistToggle = () => {
    setPlaylistToggle(!playlistToggle);
  };

  const handleTracklistToggle = (tracks) => {
    setTracklistToggle(!tracklistToggle);
    if (tracklistToggle) return;
    setTracklist(tracks);
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
    if (!isLoggedIn || !playlist.length) {
      displayToast(tc.LOGIN_MESSAGE, tc.PL_ERROR_MESSAGE, tc.ERROR);
      return;
    }
    saveToSpotify();
  };

  const saveToSpotify = () => {
    let uris = playlist.map((item) => item.uri);
    let token = localStorage.getItem("token");
    savePlaylist(token, uris)
      .then((res) => {
        if (res.status < 400)
          displayToast("", tc.PL_SUCCESS_MESSAGE, tc.SUCCESS);
      })
      .catch((error) => {
        if (error)
          displayToast(tc.LOGIN_MESSAGE, tc.PL_ERROR_MESSAGE, tc.ERROR);
      });
    handlePlaylistToggle();
    setPlaylist([]);
  };

  const playOrPause = () => {
    setPreview({
      ...preview,
      play: !preview.play,
    });
  };

  const playNewAudio = (url) => {
    preview.audio.setAttribute("src", url);
    setPreview({
      ...preview,
      url: url,
      play: true,
    });
  };

  const handlePlayPreview = (url) => {
    playOrPause();
    if (url !== preview.url) {
      playNewAudio(url);
    }
  };

  const handleSelectorButton = (e) => {
    let albumButton = document.querySelector(".left");
    let singleButton = document.querySelector(".right");
    let switchSpan = document.querySelector(".active");
    switch (e.target.value) {
      case "albums":
        setReleaseType("album");
        singleButton.classList.remove("active-case");
        albumButton.classList.add("active-case");
        switchSpan.style.left = "0%";
        break;
      case "singles":
        setReleaseType("singles");
        albumButton.classList.remove("active-case");
        singleButton.classList.add("active-case");
        switchSpan.style.left = "50%";
        break;
      default:
        break;
    }
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
          selectorButton={() => handleSelectorButton}
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
            playing={preview}
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
            playing={preview}
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
