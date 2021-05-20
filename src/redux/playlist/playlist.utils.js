export const removeItem = (playlist, uri) => {
  return playlist.filter((item) => item.uri !== uri);
};
