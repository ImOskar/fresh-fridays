export const setAudioSrc = (audio, url) => {
  audio.setAttribute("src", url);
  return audio;
};
