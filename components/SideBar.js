import React, { useEffect, useState } from "react";
import useWindowDimensions from "../utils/getWindowDimesions";
import useSpotify from "../pages/customhooks/useSpotify";
import { playListIdState } from "../pages/atoms/playListState";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  MenuAlt1Icon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { atom, useRecoilState } from "recoil";
const SideBar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [isOpen, toggleDrawer] = useState(false);
  const { width } = useWindowDimensions();
  const [playlist, setPlayLists] = useState([]);
  const [playListId, setPlayListId] = useRecoilState(playListIdState);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlayLists(data.body.items);
        setPlayListId(data.body.items[0]);
      });
    }
  }, [session, spotifyApi]);

  return (
    <>
      {width < 648 && !isOpen && (
        <div className="h-screen ">
          <MenuAlt1Icon
            fontSize={26}
            className="m-4 absolute  text-black w-7  h-7"
            onClick={() => toggleDrawer(!isOpen)}
          />
        </div>
      )}
      {(isOpen || width >= 648) && (
        <div className="flex flex-col truncate  text-gray-500 border-r absolute pb-36   sm:relative md:relative bg-black  border-gray-900 text-sm h-screen overflow-y-scroll ">
          {width < 648 && (
            <button
              className="flex hover:text-white  p-2 "
              onClick={() => toggleDrawer(!isOpen)}
            >
              <XIcon className="w-5 h-5  mx-2" />
            </button>
          )}
          <div className="flex flex-col p-4 text-sm ">
            <div className="space-y-4">
              <button className="flex hover:text-white  ">
                <HomeIcon className="w-5 h-5  mx-2" />
                <label>Home</label>
              </button>
              <button className="flex hover:text-white">
                <SearchIcon className="w-5 h-5 mx-2" />
                <label>Search</label>
              </button>
              <button className="flex hover:text-white">
                <LibraryIcon className="w-5 h-5 mx-2" />
                <label>Library</label>
              </button>
              <hr className="border-gray-900 border-t=[0.1px]" />
              <button className="flex hover:text-white">
                <PlusCircleIcon className="w-5 h-5  mx-2" />
                <label>Create Playlist</label>
              </button>
              <button className="flex hover:text-white">
                <HeartIcon className="w-5 h-5 mx-2" />
                <label>Favourites</label>
              </button>
              <button className="flex hover:text-white">
                <RssIcon className="w-5 h-5 mx-2" />
                <label>Your episodes</label>
              </button>
              <hr className="border-gray-900 border-t=[0.1px]" />
              <div className="flex flex-col space-y-4 ">
                {playlist.map((data) => (
                  <label
                    key={data.id}
                    onClick={() => setPlayListId(data)}
                    className={` cursor-pointer hover:text-white ${
                      data == playListId ? "text-white" : "text-gray-500"
                    } `}
                  >
                    {data.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
