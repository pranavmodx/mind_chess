import { useEffect, useContext } from "react";

import P2PContext from "../context/P2P/P2PContext";
import GameContext from "../context/game/GameContext";
import HumanGameContext from "../context/humanGame/HumanGameContext";
import SettingsContext from "../context/settings/SettingsContext";

import { GAME_ANNOUNCE_URLS, APP_NAME } from "../config/constants";

import { MSG_TYPES, SIGNAL_TYPES } from "./types";

const P2PT = require("p2pt");

const useP2Pt = () => {
  const p2pContext = useContext(P2PContext);
  const { p2pt, setP2pt, setOppPeerObj } = p2pContext;

  const gameContext = useContext(GameContext);
  const {
    chessClient,
    setChessClient,
    setMovesPgn,
    setMovesFen,
    setMyTurn,
    resetGameState,
  } = gameContext;

  const humanGameContext = useContext(HumanGameContext);
  const {
    colour,
    gameCode,
    gameStatus,
    setGameStatus,
    setOppUsername,
    setOppStartGame,
    setReceivedSettings,
    setOfferDraw,
    setOfferRematch,
    setRequestTakeback,
    resetHumanGameState,
  } = humanGameContext;

  const settingsContext = useContext(SettingsContext);
  const {
    username,
    setSettings: { setAllSettings },
  } = settingsContext;

  const connect = () => {
    let p2ptObj = new P2PT(GAME_ANNOUNCE_URLS, APP_NAME + gameCode); // + gameCode don't forget

    setP2pt(p2ptObj);

    p2ptObj.on("trackerconnect", (tracker, stats) => {
      console.log("Connected to tracker : " + tracker.announceUrl);
      console.log("Tracker stats : " + JSON.stringify(stats));
    });

    p2ptObj.on("peerconnect", (peer) => {
      console.log("Peer connected!");
      console.log("Peer : ", peer);

      setOppPeerObj(peer);

      let msg = { type: MSG_TYPES.USER_NAME, username };
      p2ptObj.send(peer, JSON.stringify(msg));
    });

    p2ptObj.on("peerclose", (peer) => {
      console.log("Peer disconnected!");
      console.log("Peer : ", peer);

      setOppPeerObj(null);
    });

    // Receive message from peer
    p2ptObj.on("msg", (peer, msg) => {
      msg = JSON.parse(msg); // Really important to parse!

      switch (msg.type) {
        // No message, just signals
        case SIGNAL_TYPES.START_GAME:
          console.log("start game signal received");
          setOppStartGame(true);
          break;

        case SIGNAL_TYPES.OFFER_REMATCH:
          console.log("rematch signal received");
          // let newStatus = { ...gameStatus };
          // newStatus.rematchOffered = true;
          // setGameStatus(newStatus);
          break;

        case SIGNAL_TYPES.REMATCH_OFFER_ACCEPTED:
          console.log("rematch accepted signal received");
          setOfferRematch(false);

          // newStatus = { ...gameStatus };
          // newStatus.rematchOffered = false;
          // setGameStatus(newStatus);
          // console.log(newStatus);

          resetHumanGameState();
          resetGameState();
          break;

        case SIGNAL_TYPES.REMATCH_OFFER_DECLINED:
          console.log("rematch declined signal received");
          setOfferRematch(false);

          // newStatus = { ...gameStatus };
          // console.log(newStatus);
          // newStatus.rematchOffered = false;
          // setGameStatus(newStatus);
          break;

        case SIGNAL_TYPES.OFFER_DRAW:
          console.log("draw offer signal received");
          // newStatus = { ...gameStatus };
          // newStatus.drawOffered = true;
          // setGameStatus(newStatus);
          break;

        case SIGNAL_TYPES.DRAW_OFFER_ACCEPTED:
          console.log("draw offer signal received");
          setOfferDraw(false);

          // newStatus = { ...gameStatus };
          // newStatus.drawOffered = false;
          // newStatus.main = "Draw";
          // newStatus.reason = "Agreement";
          // newStatus.winner = "Draw";
          // setGameStatus(newStatus);
          break;

        case SIGNAL_TYPES.DRAW_OFFER_DECLINED:
          console.log("draw offer declined signal received");
          setOfferDraw(false);

          // newStatus = { ...gameStatus };
          // newStatus.drawOffered = false;
          // setGameStatus(newStatus);
          break;

        case SIGNAL_TYPES.REQUEST_TAKEBACK:
          console.log("draw offer signal received");

          // newStatus = { ...gameStatus };
          // newStatus.takebackRequested = true;
          // setGameStatus(newStatus);
          break;

        case SIGNAL_TYPES.TAKEBACK_REQUEST_ACCEPTED:
          console.log("takeback accepted signal received");
          setRequestTakeback(false);
          // newStatus = { ...gameStatus };
          // newStatus.takebackRequested = false;
          // setGameStatus(newStatus);
          chessClient.undoMove();
          setMyTurn(true);
          break;

        case SIGNAL_TYPES.TAKEBACK_REQUEST_DECLINED:
          console.log("takeback declined signal received");
          setRequestTakeback(false);

          // newStatus = { ...gameStatus };
          // newStatus.takebackRequested = false;
          // setGameStatus(newStatus);
          break;

        case SIGNAL_TYPES.RESIGN:
          console.log("resign signal received");
          break;

        case SIGNAL_TYPES.ILLEGAL_MOVE_LOST:
          console.log("illegal move lost signal received");
          break;

        // Actual message & communication
        case MSG_TYPES.USER_NAME:
          console.log("opp username received : ", msg.username);
          setOppUsername(msg.username);
          break;

        case MSG_TYPES.SETTINGS:
          console.log("settings msg received");

          let modSettings = { ...msg.settings };
          if (modSettings.colour === "White") modSettings.colour = "Black";
          else modSettings.colour = "White";

          setAllSettings(modSettings);
          setReceivedSettings(true);
          break;

        case MSG_TYPES.MOVE:
          console.log("move msg received");
          chessClient.move(msg.move);
          setMovesPgn(chessClient.getPgn());
          setMovesFen(chessClient.getFen());
          setMyTurn(true);
          break;

        case MSG_TYPES.CHESS_CLIENT:
          console.log("chess client msg received");
          // chessClient.move(msg.move);
          setChessClient(msg.newClient);
          setMyTurn(true);
          break;

        case MSG_TYPES.GAME_STATUS:
          console.log("game status received");
          setGameStatus(msg.gameStatus);
          break;

        default:
          break;
      }
    });

    p2ptObj.start();
  };

  useEffect(() => {
    if (!p2pt) connect();
  }, []);
};

export default useP2Pt;
