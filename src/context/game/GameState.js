import React, { useReducer } from "react";

import GameContext from "./GameContext";
import GameReducer from "./GameReducer";

import { ChessClient } from "../../helper/ChessClient";
import { STARTING_FEN } from "../../config/constants";

import {
  SET_START_GAME,
  SET_CHESS_CLIENT,
  SET_MOVES_PGN,
  SET_MOVES_FEN,
  SET_GAME_STATUS,
  SET_MY_TURN,
  RESET_GAME_STATE,
} from "../types";

export const newChessClient = () => new ChessClient(STARTING_FEN);

export const newGameState = {
  chessClient: newChessClient(),
  startGame: false,
  movesPgn: null,
  movesFen: STARTING_FEN,
  myTurn: true,
  gameStatus: "New Game",
};

const GameState = (props) => {
  const initialState = newGameState;

  const [state, dispatch] = useReducer(GameReducer, initialState);

  const setChessClient = (value) => {
    dispatch({ type: SET_CHESS_CLIENT, payload: value });
  };

  const setStartGame = (value) => {
    dispatch({ type: SET_START_GAME, payload: value });
  };

  const setMovesPgn = (movesPgn) => {
    dispatch({ type: SET_MOVES_PGN, payload: movesPgn });
  };

  const setMovesFen = (movesFen) => {
    dispatch({ type: SET_MOVES_FEN, payload: movesFen });
  };

  const setMyTurn = (myTurn) => {
    dispatch({ type: SET_MY_TURN, payload: myTurn });
  };

  const setGameStatus = (gameStatus) => {
    dispatch({ type: SET_GAME_STATUS, payload: gameStatus });
  };

  const resetGameState = () => {
    dispatch({ type: RESET_GAME_STATE, payload: newGameState });
  };

  return (
    <GameContext.Provider
      value={{
        chessClient: state.chessClient,
        startGame: state.startGame,
        movesPgn: state.movesPgn,
        movesFen: state.movesFen,
        myTurn: state.myTurn,
        gameStatus: state.gameStatus,
        setChessClient,
        setStartGame,
        setMovesPgn,
        setMovesFen,
        setMyTurn,
        setGameStatus,
        resetGameState,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
