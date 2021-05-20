import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTracklist } from "../../redux/releases/release.actions";
import { addToPlaylist } from "../../redux/playlist/playlist.actions";
import { handlePreviewAudio } from "../../redux/preview/preview.actions";
import SvgButton from "../SvgButton/SvgButton";
import "./Tracklist.styles.css";

const Tracklist = () => {
  const dispatch = useDispatch();
  const { tracklist } = useSelector((state) => state.releaseList);
  const { url, playing } = useSelector((state) => state.preview);

  const audioPlaying = (preview) => preview === url && playing;

  return (
    <div className="tracklist">
      <div className="tracklist-header">
        <SvgButton
          classes="btn close-container close md"
          icon="times"
          click={() => dispatch(closeTracklist())}
        />
        <span className="tracklist-header-title title-margin">
          {tracklist.artist + ":"}
        </span>
        <span className="tracklist-header-title">{tracklist.title}</span>
      </div>
      <table className="tracklist-table">
        <tbody>
          {tracklist.tracks.map((track) => {
            return (
              <tr className="tracklist-item" key={track.uri}>
                <td className="tracklist-title">{track.title}</td>
                <td className="tracklist-play">
                  {track.preview && (
                    <SvgButton
                      title="Play/Pause"
                      classes={
                        audioPlaying(track.preview)
                          ? "btn play md pulse-btn"
                          : "btn play md"
                      }
                      click={() => dispatch(handlePreviewAudio(track.preview))}
                      icon={
                        audioPlaying(track.preview)
                          ? "pause-circle"
                          : "play-circle"
                      }
                    />
                  )}
                </td>
                <td className="tracklist-add">
                  <SvgButton
                    title="Add to playlist"
                    classes="btn add md"
                    click={() =>
                      dispatch(
                        addToPlaylist({
                          artist: track.artist,
                          title: track.title,
                          uri: track.uri,
                        })
                      )
                    }
                    icon="plus-circle"
                  />
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
