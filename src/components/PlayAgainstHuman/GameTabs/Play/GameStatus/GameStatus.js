import React, { useContext } from "react";

import GameContext from "../../../../../context/game/GameContext";
import HumanGameContext from "../../../../../context/humanGame/HumanGameContext";
import SettingsContext from "../../../../../context/settings/SettingsContext";

import "./GameStatus.scss";

const GameStatus = () => {
  const gameContext = useContext(GameContext);
  const { chessClient, myTurn } = gameContext;

  const humanGameContext = useContext(HumanGameContext);
  const { oppUsername, gameStatus } = humanGameContext;

  const settingsContext = useContext(SettingsContext);
  const { username: myUsername } = settingsContext;

  const getLastMove = (offsetTrue, offsetFalse) => {
    const history = chessClient.getMoveHistory();
    const offset = !myTurn ? offsetTrue : offsetFalse;
    return history[history.length - offset];
  };

  let lastOppMove = getLastMove(2, 1);
  let lastMyMove = getLastMove(1, 2);

  const myText = lastMyMove ? (
    <h4 className="text status-move">You played {lastMyMove}</h4>
  ) : (
    myTurn && <h4 className="text status-main">Make your move, {myUsername}</h4>
  );

  const oppText = lastOppMove ? (
    <h4 className="text status-move">
      {oppUsername} played {lastOppMove}
    </h4>
  ) : (
    !myTurn && (
      <h4 className="text status-move">Wait for {oppUsername} to move</h4>
    )
  );

  return (
    <div className="gamestatus">
      <h3 className="text status-main">{gameStatus.main}</h3>
      {gameStatus.winner && (
        <h4 className="text status-winner">
          {gameStatus.winner} {gameStatus.winner !== "Draw" ? "won" : ""} by{" "}
          {gameStatus.reason}
        </h4>
      )}

      {!gameStatus.winner && myText}
      {!gameStatus.winner && oppText}
    </div>
  );
};

export default GameStatus;
