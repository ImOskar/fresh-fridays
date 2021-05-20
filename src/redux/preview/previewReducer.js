import PreviewActionTypes from "./preview.types";
import { setAudioSrc } from "./preview.utils";

const INITIAL_STATE = {
  audio: new Audio(),
  url: "",
  playing: false,
};

const previewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PreviewActionTypes.NEW_AUDIO_SOURCE:
      return {
        audio: setAudioSrc(state.audio, action.payload),
        url: action.payload,
        playing: true,
      };
    case PreviewActionTypes.PLAY_TOGGLE:
      return {
        ...state,
        playing: !state.playing,
      };
    case PreviewActionTypes.PLAY_ENDED:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default previewReducer;
