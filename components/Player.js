import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isPlaying, selectedSongId } from "../pages/atoms/songPlayAtom";
import useSpotify from "../pages/customhooks/useSpotify";
import useSongInfo from "../pages/customhooks/useSongInfo";
import useDeviceId from "../pages/customhooks/useDeviceId";
import { useSession } from "next-auth/react";
import {
  HeartIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from "@heroicons/react/solid";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, state } = useSession();

  const [selectedSong, setSelectedSong] = useRecoilState(selectedSongId);
  const [isSongPlaying, setIsSongPlaying] = useRecoilState(isPlaying);
  const songInfo = useSongInfo();
  const [volume, setVolume] = useState(50);
  const deviceIds = useDeviceId();

  console.log(deviceIds);

  const fetchSong = async () => {
    if (!songInfo && session?.user?.accessToken) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setSelectedSong(data?.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsSongPlaying(data?.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsSongPlaying(false);
      } else {
        spotifyApi.play();
        setIsSongPlaying(true);
      }
    });
  };

  useEffect(() => {
    fetchSong();
    setVolume(50);
  }, [session, selectedSongId, spotifyApi]);

  return songInfo ? (
    <div
      className={
        "sticky bottom-0 h-24   bg-gradient-to-b from-black to-gray-900 text-gray-500  p-2 lg:p-5"
      }
    >
      <div className="flex space-x-3 items-center">
        <img
          src={songInfo?.album?.images?.[0]?.url}
          className="hidden md:inline w-10 h-10"
        />
        <div className="flex flex-col">
          <label className="text-white text-base lg:text-lg ">
            {songInfo?.name}
          </label>
          <label className="text-sm lg:text-base">
            {songInfo?.artists?.[0]?.name}
          </label>
        </div>

        <div className="flex flex-1 items-center justify-between lg:justify-center lg:space-x-10">
          <HeartIcon className="button text-white" />
          <SwitchHorizontalIcon className="button text-white" />
          <RewindIcon className="button text-white" />
          {!isSongPlaying ? (
            <PlayIcon
              className="button text-white w-10 h-10"
              onClick={() => handlePlayPause()}
            />
          ) : (
            <PauseIcon
              className="button text-white w-10 h-10"
              onClick={() => handlePlayPause()}
            />
          )}
          <FastForwardIcon className="button text-white" />
          <ReplyIcon className="button text-white" />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Player;
