import React, { useReducer } from "react";

import HumanGameContext from "./HumanGameContext";
import HumanGameReducer from "./HumanGameReducer";

import {
  SET_OPP_USERNAME,
  SET_OPP_START_GAME,
  SET_RECEIVED_SETTINGS,
  SET_HOST,
  SET_GAME_CODE,
  SET_HUMAN_GAME_STATUS,
  RESET_HUMAN_GAME_STATE,
  SET_OFFER_DRAW,
  SET_OFFER_REMATCH,
  SET_REQUEST_TAKEBACK,
} from "../types";

export const newHumanGameState = {
  gameCode: "",
  isHost: false,
  oppUsername: "",
  oppStartGame: false,
  receivedSettings: false,
  gameStatus: {
    main: "New Game",
    winner: null,
    reason: null,
    rematchOffered: false,
    drawOffered: false,
    takebackRequested: false,
  },
  offerRematch: false,
  offerDraw: false,
  requestTakeback: false,
};

const HumanGameState = (props) => {
  const initialState = newHumanGameState;

  const [state, dispatch] = useReducer(HumanGameReducer, initialState);

  const setGameCode = (gameCode) => {
    dispatch({ type: SET_GAME_CODE, payload: gameCode });
  };

  const setHost = () => {
    dispatch({ type: SET_HOST, payload: null });
  };

  const setOppUsername = (username) => {
    dispatch({ type: SET_OPP_USERNAME, payload: username });
  };

  const setOppStartGame = (value) => {
    dispatch({ type: SET_OPP_START_GAME, payload: value });
  };

  const setReceivedSettings = (value) => {
    dispatch({ type: SET_RECEIVED_SETTINGS, payload: value });
  };

  const setGameStatus = (gameStatus) => {
    dispatch({ type: SET_HUMAN_GAME_STATUS, payload: gameStatus });
  };

  const setOfferRematch = (value) => {
    dispatch({ type: SET_OFFER_REMATCH, payload: value });
  };

  const setOfferDraw = (value) => {
    dispatch({ type: SET_OFFER_DRAW, payload: value });
  };

  const setRequestTakeback = (value) => {
    dispatch({ type: SET_REQUEST_TAKEBACK, payload: value });
  };

  const resetHumanGameState = () => {
    dispatch({
      type: RESET_HUMAN_GAME_STATE,
      payload: {
        oppStartGame: false,
        receivedSettings: false,
        gameStatus: {
          main: "New Game",
          winner: null,
          reason: null,
          rematchOffered: false,
          drawOffered: false,
          takebackRequested: false,
        },
      },
    });
  };

  return (
    <HumanGameContext.Provider
      value={{
        gameCode: state.gameCode,
        isHost: state.isHost,
        oppUsername: state.oppUsername,
        oppStartGame: state.oppStartGame,
        receivedSettings: state.receivedSettings,
        gameStatus: state.gameStatus,
        offerRematch: state.offerRematch,
        offerDraw: state.offerDraw,
        requestTakeback: state.requestTakeback,
        setHost,
        setGameCode,
        setOppUsername,
        setOppStartGame,
        setReceivedSettings,
        setGameStatus,
        setOfferRematch,
        setOfferDraw,
        setRequestTakeback,
        resetHumanGameState,
      }}
    >
      {props.children}
    </HumanGameContext.Provider>
  );
};

export default HumanGameState;
