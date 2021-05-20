import PlaylistActionTypes from "./playlist.types";
import { removeItem } from "./playlist.utils";

const INITIAL_STATE = {
  tracks: [],
  playlistToggle: false,
};

const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlaylistActionTypes.TOGGLE_PLAYLIST:
      return {
        ...state,
        playlistToggle: !state.playlistToggle,
      };
    case PlaylistActionTypes.ADD_ITEM:
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      };
    case PlaylistActionTypes.REMOVE_ITEM:
      return {
        ...state,
        tracks: removeItem(state.tracks, action.payload),
      };
    case PlaylistActionTypes.SAVE_SUCCESS:
      return {
        tracks: [],
        playlistToggle: false,
      };
    case PlaylistActionTypes.CLEAR_PLAYLIST:
      return {
        ...state,
        tracks: [],
      };
    default:
      return state;
  }
};

export default playlistReducer;
