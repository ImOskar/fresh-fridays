import PlaylistActionTypes from "./playlist.types";
import {
  apiSongLimit,
  getUser,
  createNewPlaylist,
  addSongsToPlaylist,
} from "../../utils/spotifyApi";
import * as constants from "../../utils/constants";
import { chunks } from "../../utils/functions";
import { showToastWithTimeout } from "../toast/toast.actions";

export const togglePlaylist = () => ({
  type: PlaylistActionTypes.TOGGLE_PLAYLIST,
});

export const addToPlaylist = (item) => (dispatch, getState) => {
  const state = getState();
  const playlist = state.playlist.tracks;

  if (playlist.some((playlistItem) => playlistItem.uri === item.uri)) {
    return dispatch(
      showToastWithTimeout({
        title: constants.DUP_MESSAGE,
        message: item.artist + " - " + item.title,
        type: constants.DUPLICATE,
      })
    );
  }

  dispatch({
    type: PlaylistActionTypes.ADD_ITEM,
    payload: item,
  });
};

export const removeFromPlaylist = (uri) => ({
  type: PlaylistActionTypes.REMOVE_ITEM,
  payload: uri,
});

export const clearPlaylist = () => ({
  type: PlaylistActionTypes.CLEAR_PLAYLIST,
});

export const savePlaylistToSpotify = (playlist) => async (dispatch) => {
  if (!playlist.length)
    return dispatch(
      showToastWithTimeout({
        title: constants.PL_ERROR_MESSAGE,
        message: constants.PL_EMPTY_MESSAGE,
        type: constants.ERROR,
      })
    );
  const token = localStorage.getItem("token");
  if (!token)
    return dispatch(
      showToastWithTimeout({
        title: constants.PL_ERROR_MESSAGE,
        message: constants.LOGIN_MESSAGE,
        type: constants.ERROR,
      })
    );

  const uris = playlist.map((item) => item.uri);
  try {
    const userId = await getUser(token);
    const playlistId = await createNewPlaylist(userId, token);

    if (uris.length > apiSongLimit) {
      let uriChunks = chunks(uris, apiSongLimit);
      await Promise.all(
        uriChunks.map(async (chunk) => {
          await addSongsToPlaylist(token, playlistId, chunk);
        })
      );
    } else await addSongsToPlaylist(token, playlistId, uris);

    dispatch(
      showToastWithTimeout({
        title: "",
        message: constants.PL_SUCCESS_MESSAGE,
        type: constants.SUCCESS,
      })
    );
    dispatch({ type: PlaylistActionTypes.SAVE_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch(
      showToastWithTimeout({
        title: "",
        message: constants.PL_ERROR_MESSAGE,
        type: constants.ERROR,
      })
    );
    dispatch({
      type: PlaylistActionTypes.SAVE_FAIL,
      payload: error,
    });
  }
};
