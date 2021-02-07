import React, { useReducer } from "react";

import P2PContext from "./P2PContext";
import P2PReducer from "./P2PReducer";

import { SET_P2PT, SET_OPP_PEER_OBJ } from "../types";

import { MSG_TYPES } from "../../hooks/types";

export const newP2PState = {
  p2pt: null,
  oppPeerObj: null,
};

const P2PState = (props) => {
  const initialState = newP2PState;

  const [state, dispatch] = useReducer(P2PReducer, initialState);

  const setP2pt = (p2pt) => {
    dispatch({ type: SET_P2PT, payload: p2pt });
  };

  const setOppPeerObj = (oppPeerObj) => {
    dispatch({ type: SET_OPP_PEER_OBJ, payload: oppPeerObj });
  };

  // Send message to peer
  const sendSignal = (signalMsg) => {
    if (state.oppPeerObj) {
      let msg = {
        type: signalMsg,
      };
      state.p2pt.send(state.oppPeerObj, JSON.stringify(msg));
    }
  };

  const sendUsername = (username) => {
    if (state.oppPeerObj) {
      let msg = { type: MSG_TYPES.USER_NAME, username };
      state.p2pt.send(state.oppPeerObj, JSON.stringify(msg));
    }
  };

  const sendSettings = (settings) => {
    if (state.oppPeerObj) {
      // mutate settings
      let modSettings = { ...settings };
      delete modSettings.username;

      let msg = { type: MSG_TYPES.SETTINGS, settings: modSettings };
      state.p2pt.send(state.oppPeerObj, JSON.stringify(msg));
    }
  };

  const sendMove = (move) => {
    if (state.oppPeerObj) {
      let msg = { type: MSG_TYPES.MOVE, move };
      state.p2pt.send(state.oppPeerObj, JSON.stringify(msg));
    }
  };

  const sendChessClient = (newClient) => {
    if (state.oppPeerObj) {
      let msg = { type: MSG_TYPES.CHESS_CLIENT, newClient };
      state.p2pt.send(state.oppPeerObj, JSON.stringify(msg));
    }
  };

  const sendGameStatus = (gameStatus) => {
    if (state.oppPeerObj) {
      let msg = { type: MSG_TYPES.GAME_STATUS, gameStatus };
      state.p2pt.send(state.oppPeerObj, JSON.stringify(msg));
    }
  };

  return (
    <P2PContext.Provider
      value={{
        p2pt: state.p2pt,
        oppPeerObj: state.oppPeerObj,
        setP2pt,
        setOppPeerObj,
        sendSignal,
        sendUsername,
        sendSettings,
        sendMove,
        sendChessClient,
        sendGameStatus,
      }}
    >
      {props.children}
    </P2PContext.Provider>
  );
};

export default P2PState;
