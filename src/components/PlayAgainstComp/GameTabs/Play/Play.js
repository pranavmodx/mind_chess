import React, { useState, useContext } from "react";

import GameContext from "../../../../context/game/GameContext";
import SettingsContext from "../../../../context/settings/SettingsContext";
import CounterContext from "../../../../context/counter/CounterContext";

import { getBestMove } from "../../../../helper/Engine";
import { formatMove } from "../../../../helper/FormatMove";
import { MAX_NOTATION_LENGTH } from "../../../../config/constants";
import { newGameState } from "../../../../context/game/GameState";

import "./Play.scss";

import GameStatus from "./GameStatus/GameStatus";
import MoveButtons from "../../../common/MoveButtons/MoveButtons";

const Play = () => {
  const gameContext = useContext(GameContext);
  const {
    chessClient,
    startGame,
    gameStatus,
    setStartGame,
    setMovesPgn,
    setMovesFen,
    setMyTurn,
    setGameStatus,
    resetGameState,
  } = gameContext;

  const settingsContext = useContext(SettingsContext);
  const { colour, show, timesToShow, timesAllowed } = settingsContext;

  const counterContext = useContext(CounterContext);
  const { setCounter, decrementCounter } = counterContext;

  const [inputMove, setInputMove] = useState("");
  const [showLegalMoves, setShowLegalMoves] = useState(false);

  
  const makeMove = (move, comp=true) => {
    if (chessClient.isValidMove(move)) {
      chessClient.move(move);
      setMovesPgn(chessClient.getPgn());
      setMovesFen(chessClient.getFen());
      if (comp) setMyTurn(true);
      else setMyTurn(false);
      setGameStatus(chessClient.getStatus());
    }
  };

  const handleMoveSubmit = () => {
    if (inputMove.length >= MAX_NOTATION_LENGTH) {
      console.log("Max notation length exceeded!");
    } else {
      if (!chessClient.isValidMove(inputMove)) {
        console.log("Not valid / illegal move");
      } else {
        makeMove(inputMove, false);
        setInputMove("");
        getBestMove(1500, chessClient.getFen(), makeMove);
      }
    }
  };

  const handleStartGame = () => {
    setStartGame(true);

    if (colour === "Black") {
      getBestMove(1500, chessClient.getFen(), makeMove);
      setMyTurn(true);
    }

    setCounter("legalMoves", timesToShow.legalMoves);
    setCounter("movesTable", timesToShow.movesTable);
    setCounter("board", timesToShow.board);
    setCounter("illegalMoves", timesAllowed.illegalMove);
    setCounter("takeBacks", timesAllowed.takeBack);
  };

  const handleNewGame = () => {
    resetGameState(newGameState);
    setStartGame(true);
  };

  const handleResignation = () => {
    setGameStatus("Computer won");
  };

  const handleTakeback = () => {
    // Take back 2 moves (Computer moves instantly)
    let moveObj = chessClient.undoMove();
    moveObj = chessClient.undoMove();
    if (moveObj) {
      decrementCounter("takeBacks");
    }
  };

  const gameOver = gameStatus !== "New Game" || gameStatus !== "Active Game";

  return (
    <div className="play-comp">
      {!startGame ? (
        <div>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <>
          <GameStatus />
          <input
            type="text"
            name="move-input"
            value={inputMove}
            placeholder="Enter your move"
            className="move-input"
            onChange={(e) => setInputMove(e.target.value)}
          />
          <button
            onClick={() =>
              setShowLegalMoves((showLegalMoves) => !showLegalMoves)
            }
            disabled={gameOver && !show.legalMoves}
          >
            Show Legal Moves
          </button>
          {show.legalMoves && showLegalMoves && (
            <>
              {chessClient
                .getLegalMoves()
                .map((move) =>
                  MoveButtons(move, formatMove(move), setInputMove)
                )}
            </>
          )}
          <button onClick={handleMoveSubmit} disabled={gameOver}>
            Submit
          </button>

          <button onClick={handleTakeback} disabled={gameOver}>
            Takeback
          </button>
          <button onClick={handleResignation} disabled={gameOver}>
            Resign
          </button>
          <button onClick={handleNewGame}>New Game</button>
        </>
      )}
    </div>
  );
};

export default Play;
