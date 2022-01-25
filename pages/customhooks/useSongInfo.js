import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "./useSpotify";
import { selectedSongId } from "../atoms/songPlayAtom";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const selectedSong = useRecoilValue(selectedSongId);
  const [songInfo, setSongInfo] = useState(null);
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (selectedSong) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${selectedSong}`,
          {
            headers: {
              Authorization: "Bearer " + spotifyApi.getAccessToken(),
            },
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [spotifyApi, selectedSong]);
  return songInfo;
};

export default useSongInfo;
