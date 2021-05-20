import React from "react";
import { useDispatch } from "react-redux";
import { removeFromPlaylist } from "../../redux/playlist/playlist.actions";
import SvgButton from "../SvgButton/SvgButton";
import "./PlaylistItem.styles.css";

const PlaylistItem = ({ artist, title, uri }) => {
  const dispatch = useDispatch();
  return (
    <tr className="playlist-item" key={uri}>
      <td className="item-title">{title}</td>
      <td className="item-artist">{artist}</td>
      <td className="item-remove">
        <SvgButton
          title="Remove track"
          classes="btn sm remove"
          click={() => dispatch(removeFromPlaylist(uri))}
          icon="minus-circle"
        />
      </td>
    </tr>
  );
};

export default PlaylistItem;
