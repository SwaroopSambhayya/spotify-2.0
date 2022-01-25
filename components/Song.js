import React from "react";
import { useRecoilState } from "recoil";
import msToHMS from "../utils/militominutes";
import { isPlaying, selectedSongId } from "../pages/atoms/songPlayAtom";
import useSpotify from "../pages/customhooks/useSpotify";

const Song = ({ track, order }) => {
  const [selectedSong, setSelectedSong] = useRecoilState(selectedSongId);
  const [isSongPlaying, setIsSongPlaying] = useRecoilState(isPlaying);
  const spotifyApi = useSpotify();
  const playSong = () => {
    setSelectedSong(track?.track?.id);
    setIsSongPlaying(true);
    spotifyApi.play({
      uris: [track?.track?.uri],
    });
  };

  return (
    <div
      className="grid grid-flow-col grid-cols-2 text-gray-500 items-center cursor-pointer hover:bg-gray-900 text-sm mr-5 ml-2 rounded-lg  "
      onClick={() => playSong()}
    >
      <div className="flex items-center  p-2 mx-2  space-x-4  ">
        <label className="text-sm">{order + 1}</label>
        <img
          src={track?.track?.album?.images?.[0]?.url}
          className="w-10 h-10"
        />
        <div className="flex flex-col">
          <label className="text-white w-36 lg:w-64 text-base truncate ">
            {track?.track?.name}
          </label>
          <label className=" w-44 lg:w-64 truncate">
            {track?.track?.artists.map(
              (artist, i) =>
                artist?.name +
                `${
                  i !== track?.track?.artists?.length - 1 &&
                  track?.track?.artists?.length !== 1
                    ? ", "
                    : ""
                }`
            )}
          </label>
        </div>
      </div>
      <label className="hidden md:inline justify-self-center w-36 lg:w-64 truncate">
        {track?.track?.album?.name}
      </label>
      <label className=" justify-self-end  inline">
        {msToHMS(track?.track?.duration_ms)}
      </label>
    </div>
  );
};

export default Song;
