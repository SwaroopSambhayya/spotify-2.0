import SpotifyWebApi from "spotify-web-api-node";
const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-email",
  "user-follow-modify",
  "user-follow-read",
  "user-library-read",
  "streaming",
  "app-remote-control",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-modify-public",
].join(",");

const params = {
  scope: scopes,
};
const queryParams = new URLSearchParams(params);

export const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParams.toString();
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_ID,
  clientSecret: process.env.NEXT_PUBLIC_SECRET,
});

export default spotifyApi;
