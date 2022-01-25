import React from "react";
import Song from "./Song";
const Songs = ({ songs }) => {
  return (
    <div className="flex flex-col space-y-5     my-14 ">
      {songs?.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
