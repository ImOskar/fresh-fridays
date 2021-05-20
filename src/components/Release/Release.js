import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPlaylist } from "../../redux/playlist/playlist.actions";
import { openTracklist } from "../../redux/releases/release.actions";
import { handlePreviewAudio } from "../../redux/preview/preview.actions";
import SvgButton from "../SvgButton/SvgButton";
import "./Release.styles.css";

const Release = ({
  artist,
  title,
  image,
  url,
  uri,
  preview,
  tracks,
  album,
}) => {
  const previewState = useSelector((state) => state.preview);
  const dispatch = useDispatch();

  const isPlaying = () => {
    return preview === previewState.url && previewState.playing;
  };

  return (
    <div className="album">
      <div className="img-hov">
        <img className="album-img" alt="album" src={image} />
        <div className="album-link">
          <a href={url}>
            <SvgButton
              classes="spotify-link btn links-align"
              title="Open in Spotify"
              icon={["fab", "spotify"]}
            />
          </a>
          {preview && (
            <SvgButton
              classes={
                isPlaying()
                  ? "play btn links-align pulse-btn"
                  : "play btn links-align"
              }
              title="Play"
              click={() => dispatch(handlePreviewAudio(preview))}
              icon={isPlaying() ? "pause-circle" : "play-circle"}
            />
          )}
          {album ? (
            <SvgButton
              classes="add btn links-align"
              title="Open tracklist"
              click={() => dispatch(openTracklist({ artist, title, tracks }))}
              icon="list-alt"
            />
          ) : (
            <SvgButton
              classes="add btn links-align"
              title="Add to playlist"
              icon="plus-circle"
              click={() => dispatch(addToPlaylist({ artist, title, uri }))}
            />
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
