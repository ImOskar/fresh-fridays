import PreviewActionTypes from "./preview.types";

export const newAudioSource = (url) => ({
  type: PreviewActionTypes.NEW_AUDIO_SOURCE,
  payload: url,
});

export const playToggle = () => ({
  type: PreviewActionTypes.PLAY_TOGGLE,
});

export const playEnded = () => ({
  type: PreviewActionTypes.PLAY_ENDED,
});

export const handlePreviewAudio = (url) => (dispatch, getState) => {
  const state = getState();
  const playingUrl = state.preview.url;

  if (playingUrl !== url) {
    dispatch(newAudioSource(url));
  } else dispatch(playToggle());
};
