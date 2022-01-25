import { atom } from "recoil";

export const isPlaying = atom({
  key: "isPlaying",
  default: false,
});
export const selectedSongId = atom({
  key: "selectedSongId",
  default: null,
});
