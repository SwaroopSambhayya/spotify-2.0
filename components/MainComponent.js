import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { playListIdState } from "../pages/atoms/playListState";
import useSpotify from "../pages/customhooks/useSpotify";
import Songs from "./Songs";

const MainComponent = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const playlistData = useRecoilValue(playListIdState);
  const colors = [
    "from-red-500",
    "from-green-500",
    "from-yellow-500",
    "from-blue-500",
    "from-indigo-500",
    "from-pink-500",
    "from-orange-500",
  ];
  const [color, setColor] = useState(colors[0]);
  const [playLists, setPlayLists] = useState({});

  useEffect(() => {
    var shuffledIndex = Math.floor(Math.random() * 8);

    setColor(colors[shuffledIndex] ?? colors[0]);
  }, [playlistData]);

  useEffect(() => {
    if (playlistData.id) {
      spotifyApi
        .getPlaylist(playlistData?.id)
        .then((data) => setPlayLists(data.body))
        .catch((err) => console.log(err));
    }
  }, [playlistData, spotifyApi]);
  const albumUrl = playLists?.images?.[0]?.url;
  return (
    <div className="flex flex-col flex-grow h-screen overflow-y-scroll ">
      <header
        className={"flex  flex-col h-96 bg-gradient-to-b to-black " + color}
      >
        <div className="flex flex-1 justify-end m-4    items-start h-14 ">
          <div
            className="flex bg-black items-center p-2  space-x-2 rounded-full cursor-pointer "
            onClick={() => signOut()}
          >
            <img
              src={session?.user?.image}
              className="w-10 h-10 rounded-full "
            />
            <p className="text-white text-sm">{session?.user?.name}</p>
            <ChevronDownIcon className="text-white w-4 h-4" />
          </div>
        </div>
        <div className="flex  text-white font-bold">
          <img src={albumUrl} className="w-44 h-44 mx-4 rounded shadow-xl" />
          <div className="flex flex-col justify-end ">
            <label className="text-xl ">PLAYLIST</label>
            <label className="text-2xl md:text-3xl  xl:text-5xl  ">
              {" "}
              {playlistData?.name}{" "}
            </label>
          </div>
        </div>
      </header>
      <Songs songs={playLists?.tracks?.items} />
    </div>
  );
};

export default MainComponent;
