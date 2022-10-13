import { writable, derived } from "svelte/store";

export const playlist = [
  "HEjusrpQ6qk",
  "nybwdbb1rG4",
  "oY7ROFdetNM",
  "HEjusrpQ6qk",
];
export const curVidIndex = writable(0);

export const curVidId = derived(
  curVidIndex,
  ($curVidIndex) => playlist[$curVidIndex]
);
export const nextVidId = derived(
  curVidIndex,
  ($curVidIndex) => playlist[($curVidIndex + 1) % playlist.length]
);
export const prevVidId = derived(
  curVidIndex,
  ($curVidIndex) =>
    playlist[$curVidIndex == 0 ? playlist.length - 1 : $curVidIndex - 1]
);

export function nextVidIndex() {
  curVidIndex.update((curVidIndex) => (curVidIndex + 1) % playlist.length);
}
export function prevVidIndex() {
  curVidIndex.update((curVidIndex) =>
    curVidIndex == 0 ? playlist.length - 1 : curVidIndex - 1
  );
}

export let player = writable(null);
export let playerState = writable(5);
export const volumeState = writable(1);
