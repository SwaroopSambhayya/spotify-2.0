import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
const useDeviceId = () => {
  const spotifyApi = useSpotify();
  const [deviceIds, setDeviceId] = useState([]);
  const { data: session, status } = useSession();
  useEffect(() => {
    const getDeviceIds = async () => {
      if (session) {
        spotifyApi
          .getMyDevices()
          .then((data) => setDeviceId(data?.body?.devices))
          .catch((error) => console.log(error));
      }
    };
    getDeviceIds();
  }, [spotifyApi, session, status]);

  return deviceIds;
};

export default useDeviceId;
