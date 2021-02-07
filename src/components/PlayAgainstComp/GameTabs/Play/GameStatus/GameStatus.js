import React, { useContext } from "react";

import GameContext from "../../../../../context/game/GameContext";

import "./GameStatus.scss";

const GameStatus = () => {
  const gameContext = useContext(GameContext);
  const { chessClient, myTurn, gameStatus } = gameContext;

  const getLastMove = (offsetTrue, offsetFalse) => {
    const history = chessClient.getMoveHistory();
    const offset = !myTurn ? offsetTrue : offsetFalse;
    return history[history.length - offset];
  };

  const lastHumanMove = getLastMove(1, 2);
  const lastCompMove = getLastMove(2, 1);

  const humanText = lastHumanMove ? (
    <div>
      <span>You played </span>
      {lastHumanMove}
    </div>
  ) : (
    <span>Make your move!</span>
  );
  const compText = lastCompMove ? (
    <div>
      <span>Computer played </span>
      {lastCompMove}
    </div>
  ) : (
    <span>Computer is waiting...</span>
  );

  return (
    <div>
      <span>{gameStatus}</span>
      {gameStatus !== "Computer won" && (
        <>
          {humanText}
          {compText}
        </>
      )}
    </div>
  );
};

export default GameStatus;
