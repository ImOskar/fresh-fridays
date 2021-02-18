import axios from "axios";
import * as functions from "./functions";

export const getLoginPath = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const scopes = ["playlist-modify-public", "playlist-modify-private"];
  return (
    "https://accounts.spotify.com/authorize?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI) +
    "&scope=" +
    encodeURIComponent(scopes.join(" ")) +
    "&response_type=token"
  );
};

export default async function savePlaylist(token, uriArray) {
  let userId = await getUser(token);

  let playlistInfo = {
    name: "Fresh Fridays #" + functions.getFridayNumber(),
    description: "New hip-hop!",
  };
  let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  let headers = createHeaders("post", url, playlistInfo, token);

  const result = await axios(headers)
    .then((res) => res.data.id)
    .catch((error) => {
      console.log("error: " + error);
    });

  let spotifyApiLimit = 100;
  if (uriArray.length > spotifyApiLimit) {
    let uriChunks = functions.chunks(uriArray, spotifyApiLimit);
    let response = [];
    await Promise.all(
      uriChunks.map(async (chunk) => {
        response.push(await addSongsToPlaylist(token, result, chunk));
      })
    );
    return response[0];
  }

  const response = await addSongsToPlaylist(token, result, uriArray);
  return response;
}

async function addSongsToPlaylist(token, playlistId, uriArray) {
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  let headers = createHeaders("post", url, uriArray, token);
  return axios(headers)
    .then((res) => res)
    .catch((error) => {
      console.log("error: " + error);
    });
}

function createHeaders(method, url, data, token) {
  let headers = {
    method: method,
    url: url,
    data: data,
    Accept: "application/json",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  return headers;
}

async function getUser(token) {
  let headers = createHeaders(
    "get",
    `https://api.spotify.com/v1/me`,
    "",
    token
  );
  return axios(headers)
    .then((res) => {
      return res.data.id;
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}
