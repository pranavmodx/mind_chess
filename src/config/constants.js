export const GAME_CODE_LENGTH = 4;
export const STARTING_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
export const MAX_NOTATION_LENGTH = 7;

export let GAME_ANNOUNCE_URLS = [
  "wss://tracker.openwebtorrent.com",
  "wss://tracker.sloppyta.co:443/announce",
  "wss://tracker.novage.com.ua:443/announce",
  "wss://tracker.btorrent.xyz:443/announce",
];
if (window.location.hostname === "localhost") {
  GAME_ANNOUNCE_URLS = ["ws://localhost:5000"];
}

export const APP_NAME = "Blindfold Chess";

export const MAX_TIMES = 10000;