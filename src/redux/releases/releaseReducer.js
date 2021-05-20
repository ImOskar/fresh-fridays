import ReleaseActionTypes from "./release.types";

const INITIAL_STATE = {
  releases: [],
  releaseType: "album",
  loading: true,
  tracklist: {},
  tracklistToggle: false,
};

const releaseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReleaseActionTypes.RELEASE_REQUEST:
      return { ...state, loading: true, releases: [] };
    case ReleaseActionTypes.RELEASE_SUCCESS:
      return { ...state, loading: false, releases: action.payload };
    case ReleaseActionTypes.RELEASE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ReleaseActionTypes.RELEASE_TYPE_TOGGLE:
      return {
        ...state,
        releaseType: action.payload,
      };
    case ReleaseActionTypes.OPEN_TRACKLIST:
      return {
        ...state,
        tracklist: action.payload,
        tracklistToggle: true,
      };
    case ReleaseActionTypes.CLOSE_TRACKLIST:
      return {
        ...state,
        tracklistToggle: false,
      };
    default:
      return state;
  }
};

export default releaseReducer;
