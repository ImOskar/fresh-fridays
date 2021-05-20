import axios from "axios";
import ReleaseActionTypes from "./release.types";

export const fetchReleases = (query) => async (dispatch) => {
  try {
    dispatch({ type: ReleaseActionTypes.RELEASE_REQUEST });

    const result = await axios(process.env.REACT_APP_API_URL + query);
    const data = result.data.releases;

    dispatch({ type: ReleaseActionTypes.RELEASE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ReleaseActionTypes.RELEASE_FAIL,
      payload: error.response,
    });
  }
};

export const selectReleaseType = (type) => ({
  type: ReleaseActionTypes.RELEASE_TYPE_TOGGLE,
  payload: type,
});

export const closeTracklist = () => ({
  type: ReleaseActionTypes.CLOSE_TRACKLIST,
});

export const openTracklist = (tracklist) => ({
  type: ReleaseActionTypes.OPEN_TRACKLIST,
  payload: tracklist,
});
