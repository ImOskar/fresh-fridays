import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header/Header';
import ReleaseList from '../components/ReleaseList/ReleaseList';
import Playlist from '../components/Playlist/Playlist';
import Tracklist from '../components/Tracklist/Tracklist';
import Toast from '../components/Toast/Toast';
import savePlaylist from '../utils/spotifyApi';
import * as tc from '../utils/constants';
import './App.css';


function App() {
  
  const [token, setToken] = useState('');
  const [releases, setReleases] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [tracklist, setTracklist] = useState(0);
  const [playlistToggle, setPlaylistToggle] = useState(false);
  const [tracklistToggle, setTracklistToggle] = useState(false);
  const [releaseType, setReleaseType] = useState(true);
  const [toast, setToast] = useState({ message: '', show: false, type: '', title: ''});
  const [preview, setPreview] = useState({ uri: '', url: '', audio: '', play: ''});

  useEffect(() => {
    getReleases();
  }, []);

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.hash);
    if (searchParams.has('#access_token')){
      let userToken = searchParams.get('#access_token');
      addToken(userToken);
    }
    window.location.hash = "";
  }, [])

  useEffect(() => {
    if (preview.play) {
      preview.audio.play();
      preview.audio.addEventListener("ended", onPlayEnded);
    } else if (!preview.play && preview.audio) {
      preview.audio.pause();
    }
  }, [preview]);

  const onPlayEnded = () => {
    setPreview({ uri: '', url: '', audio: '', play: false})
  }

  const addToken = (token) => {
    setToken(token);
  }

  const getReleases = () => {
    fetch('releases.json')
    .then((response) => response.json())
    .then((releases) => {
      setReleases(releases);
    });
  }

  const handlePlaylistToggle = () => {
    setPlaylistToggle(!playlistToggle);
  }

  const handleTracklistToggle = (tracks) => {
    setTracklistToggle(!tracklistToggle);
    if (tracklistToggle) return;
    setTracklist(tracks);
  }

  const handleAddToPlaylist = ( name, title, uri) => {
    if (playlist.some(item => item.uri === uri)) {
      displayToast(name + ' - ' + title, tc.DUP_MESSAGE, tc.DUPLICATE);
      return;
    }
    let playlistItem = {
      artist: name,
      title,
      uri
    }
    setPlaylist(playlist => [...playlist, playlistItem]);
  }

  const handleDeleteFromPlaylist = (uri) => {
    setPlaylist(playlist => (playlist.filter(item => item.uri !== uri)));
  }

  const handleSavePLaylist = () => {
    if (!token || !playlist.length) {
      displayToast(tc.LOGIN_MESSAGE, tc.PL_ERROR_MESSAGE, tc.ERROR);
      return;
    }
    saveToSpotify();
  }

  const saveToSpotify = () => {
    let uris = playlist.map(item => item.uri);
    savePlaylist(token, uris)
      .then(res => {if(res.status < 400) displayToast('', tc.PL_SUCCESS_MESSAGE, tc.SUCCESS)})
      .catch(error => {if(error) displayToast(tc.LOGIN_MESSAGE, tc.PL_ERROR_MESSAGE, tc.ERROR)})
    handlePlaylistToggle();
    setPlaylist([]);
  }

  const handlePlayPreview = (url, uri) => {
    if (url === preview.url && preview.play) {
      setPreview({uri:'', url:'', audio: preview.audio, play: !preview.play});
    }
    else if (url !== preview.url && preview.play){
      preview.audio.pause();
      setPreview({uri:uri, url:url, audio: new Audio(url), play: preview.play});
    }  
    else {
      setPreview({uri:uri, url:url, audio: new Audio(url), play: !preview.play});
    }
  }

  const handleSelectorButton = (e) => {
    let albumButton = document.querySelector('.left');
    let singleButton = document.querySelector('.right');
    let switchSpan = document.querySelector('.active');
    switch(e.target.value) {
      case 'albums': 
        setReleaseType(true);
        singleButton.classList.remove('active-case');
        albumButton.classList.add('active-case');
        switchSpan.style.left = '0%';
        break;
      case 'singles':
        setReleaseType(false);
        albumButton.classList.remove('active-case');
        singleButton.classList.add('active-case');
        switchSpan.style.left = '50%';
        break;
      default: break;
    } 
  }

  const displayToast = (message, title, type) => {
    setToast({message: message, show: true, type: type, title: title});
    setTimeout(() => {
      setToast({message: '', show: false, type: '', title: ''});
    }, 3000);
  }

    return (
          <div className='container'>
            <Header/>
            <main id='content'>
              <section className='content-header'>
                <div className='switch-button'>
                  <span className='active'></span>
                  <button value='albums' className='switch-button-case left active-case' 
                      onClick={handleSelectorButton}>Albums</button>
                  <button value='singles' className='switch-button-case right' 
                      onClick={handleSelectorButton}>Singles</button>
                </div>
              </section>
              {!releases.length ? 
                (<h1>Searching for new releases...</h1>) :
                (<ReleaseList clickHandler={handleAddToPlaylist} 
                  albumClick={handleTracklistToggle} previewClick={handlePlayPreview} 
                  playing={preview.uri} releases={releases} releaseType={releaseType}/>) 
              }
              {playlistToggle && 
                <Playlist handleDelete={handleDeleteFromPlaylist} 
                  handleSave={handleSavePLaylist} 
                  tracks={playlist}/> 
              }          
              <button onClick={handlePlaylistToggle} className='playlist-button btn'>
                <FontAwesomeIcon icon={faBars} />
              </button>
              {tracklistToggle && 
                <Tracklist clickHandler={handleAddToPlaylist} 
                  albumClick={handleTracklistToggle}
                  previewClick={handlePlayPreview} 
                  playing={preview.uri}
                  list={tracklist}/>
              }
              {toast.show &&
                <Toast {...toast}/>
              }
            </main>
            <footer className='footer'>
              <span>Photo by 
                <a href='https://www.pexels.com/@suzyhazelwood'> Suzy Hazelwood </a>
                from 
                <a href='https://www.pexels.com/'> Pexels </a></span>
            </footer>
          </div>
        )

}

export default App;