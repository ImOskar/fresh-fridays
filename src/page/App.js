import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReleases } from "../redux/releases/release.actions";
import { togglePlaylist } from "../redux/playlist/playlist.actions";
import ContentHeader from "../components/ContentHeader/ContentHeader";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import Playlist from "../components/Playlist/Playlist";
import ReleaseList from "../components/ReleaseList/ReleaseList";
import SvgButton from "../components/SvgButton/SvgButton";
import Toasts from "../components/Toasts/Toasts";
import Tracklist from "../components/Tracklist/Tracklist";
import useAudioPreview from "../hooks/useAudioPreview";
import useToken from "../hooks/useToken";
import { getFridayNumber } from "../utils/functions";
import "./App.css";
import "../utils/icons";

function App() {
  const { loading, error, tracklistToggle } = useSelector(
    (state) => state.releaseList
  );
  const { playlistToggle } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  const { isLoggedIn } = useToken();
  useAudioPreview();

  useEffect(() => {
    dispatch(fetchReleases(`fri${getFridayNumber()}2021`));
  }, [dispatch]);

  return (
    <div className="container" onTouchStart={() => {}}>
      <Header isLoggedIn={isLoggedIn} />
      <main id="content">
        <ContentHeader />
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="error">Error loading releases</h1>
        ) : (
          <ReleaseList />
        )}
        {playlistToggle && <Playlist />}
        <SvgButton
          classes="playlist-btn btn"
          click={() => dispatch(togglePlaylist())}
          icon="bars"
          mask="play"
        />
        {tracklistToggle && <Tracklist />}
        <Toasts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
