import React, { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPercentage, faUndo } from "@fortawesome/free-solid-svg-icons";

import P2PContext from "../../../../context/P2P/P2PContext";
import GameContext from "../../../../context/game/GameContext";
import HumanGameContext from "../../../../context/humanGame/HumanGameContext";
import SettingsContext from "../../../../context/settings/SettingsContext";
import CounterContext from "../../../../context/counter/CounterContext";

import { MAX_NOTATION_LENGTH, MAX_TIMES } from "../../../../config/constants";
import { SIGNAL_TYPES } from "../../../../hooks/types";
import { formatMove } from "../../../../helper/FormatMove";

import GameStatus from "./GameStatus/GameStatus";
import MoveButtons from "../../../common/MoveButtons/MoveButtons";

import "./Play.scss";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";

const Play = () => {
  const gameContext = useContext(GameContext);
  const {
    chessClient,
    setChessClient,
    myTurn,
    setMovesPgn,
    setMovesFen,
    setMyTurn,
    setStartGame,
    resetGameState,
  } = gameContext;

  const humanGameContext = useContext(HumanGameContext);
  const {
    gameStatus,
    oppUsername,
    setGameStatus,
    offerRematch,
    offerDraw,
    requestTakeback,
    setOfferRematch,
    setOfferDraw,
    setRequestTakeback,
    resetHumanGameState,
  } = humanGameContext;

  const settingsContext = useContext(SettingsContext);
  const {
    colour: playerColour,
    show,
    timesToShow,
    allow,
    timesAllowed,
    illegalMoveLoss,
  } = settingsContext;

  const {
    mate: showIfMate,
    checks: showIfCheck,
    captures: showIfCapture,
  } = show;

  const p2pContext = useContext(P2PContext);
  const { sendSignal, sendGameStatus, sendMove, sendChessClient } = p2pContext;

  const counterContext = useContext(CounterContext);
  const { setCounter, decrementCounter } = counterContext;

  const [inputMove, setInputMove] = useState("");
  const [showLegalMoves, setShowLegalMoves] = useState(true);

  const gameIsOver =
    gameStatus.main !== "New Game" && gameStatus.main !== "Active Game";

  const handleGameStatus = () => {
    const { main, reason } = chessClient.getStatus();

    let newStatus = { ...gameStatus };

    newStatus.main = main;
    newStatus.reason = reason;

    if (gameIsOver) newStatus.winner = main.split(" ")[0];

    setGameStatus(newStatus);
    sendGameStatus(newStatus);
  };

  const handleIllegalMove = () => {
    if (illegalMoveLoss) {
      setCounter((counter) => {
        return {
          ...counter,
          illegalMoves: counterContext.illegalMoves + 1,
        };
      });

      if (
        timesAllowed.illegalMoves <=
        counterContext.illegalMoves + 1 // setState is not asynchronous!
      ) {
        let newStatus = { ...gameStatus };

        newStatus.main = "Game Over";

        if (playerColour === "White") newStatus.winner = "Black";
        else newStatus.winner = "White";

        newStatus.reason = "Illegal move limit exceeded";

        setGameStatus(newStatus);
        sendSignal(SIGNAL_TYPES.ILLEGAL_MOVE_LOST);
        sendGameStatus(newStatus);
      }
    }
  };

  const handleInputMoveSubmit = () => {
    if (inputMove.length <= MAX_NOTATION_LENGTH) {
      if (chessClient.isValidMove(inputMove)) {
        chessClient.move(inputMove);

        setMovesPgn(chessClient.getPgn());
        setMovesFen(chessClient.getFen());

        sendMove(inputMove);

        handleGameStatus();

        setMyTurn(false);

        // sendMove(chessClient);
      } else handleIllegalMove();
    }

    setInputMove(""); // clear move
  };

  const handleOfferRematch = () => {
    setOfferRematch(true);

    let newStatus = { ...gameStatus };
    newStatus.rematchOffered = true;

    setGameStatus(newStatus);

    sendSignal(SIGNAL_TYPES.OFFER_REMATCH);
    sendGameStatus(newStatus);
  };

  const handleOfferDraw = () => {
    setOfferDraw(true);

    let newStatus = { ...gameStatus };
    newStatus.drawOffered = true;

    setGameStatus(newStatus);

    sendSignal(SIGNAL_TYPES.OFFER_DRAW);
    sendGameStatus(newStatus);
  };

  const handleRequestTakeback = (e) => {
    setRequestTakeback(true);

    let newStatus = { ...gameStatus };
    newStatus.takebackRequested = true;

    setGameStatus(newStatus);

    sendSignal(SIGNAL_TYPES.REQUEST_TAKEBACK);
    sendGameStatus(newStatus);
  };

  const handleResignation = () => {
    let newStatus = { ...gameStatus };

    if (playerColour === "White") {
      newStatus.main = "Game Over";
      newStatus.winner = "Black";
    } else {
      newStatus.main = "Game Over";
      newStatus.winner = "White";
    }
    newStatus.reason = "Resignation";

    setGameStatus(newStatus);

    sendSignal(SIGNAL_TYPES.RESIGN);
    sendGameStatus(newStatus);
  };

  const handleOfferRematchResponse = (e) => {
    let newStatus = { ...gameStatus };
    newStatus.rematchOffered = false;

    if (e.target.name === "Accept") {
      sendSignal(SIGNAL_TYPES.REMATCH_OFFER_ACCEPTED);
      resetHumanGameState();
      resetGameState();
    } else {
      sendSignal(SIGNAL_TYPES.REMATCH_OFFER_DECLINED);
      sendGameStatus(newStatus);
      setGameStatus(newStatus);
    }
  };

  const handleOfferDrawResponse = (e) => {
    let newStatus = { ...gameStatus };
    newStatus.drawOffered = false;

    if (e.target.name === "Accept") {
      newStatus.main = "Game Drawn";
      newStatus.reason = "Agreement";
      newStatus.winner = "Draw";

      sendSignal(SIGNAL_TYPES.DRAW_OFFER_ACCEPTED);
    } else sendSignal(SIGNAL_TYPES.DRAW_OFFER_DECLINED);

    setGameStatus(newStatus);
    sendGameStatus(newStatus);
  };

  const handleTakebackResponse = (e) => {
    let newStatus = { ...gameStatus };
    newStatus.takebackRequested = false;

    if (e.target.name === "Accept") {
      chessClient.undoMove();
      setMovesPgn(chessClient.getPgn());
      setMovesFen(chessClient.getFen());

      sendSignal(SIGNAL_TYPES.TAKEBACK_REQUEST_ACCEPTED);
      setMyTurn(false);
    } else sendSignal(SIGNAL_TYPES.TAKEBACK_REQUEST_DECLINED);

    setGameStatus(newStatus);
    sendGameStatus(newStatus);
  };

  return (
    <div className="play">
      <GameStatus />

      <div className="container-input">
        <input
          type="text"
          name="move-input"
          value={inputMove}
          placeholder="Enter your move"
          className="move-input"
          onChange={(e) => setInputMove(e.target.value)}
          disabled={!myTurn || gameIsOver}
        />
        {show.legalMoves && showLegalMoves !== MAX_TIMES && (
          <>
            <button
              className="btn btn-w3"
              onClick={() => {
                setShowLegalMoves((showLegalMoves) => !showLegalMoves);
                setCounter((counter) => {
                  return {
                    ...counter,
                    legalMoves: counterContext.legalMoves + 1,
                  };
                });
              }}
              // disabled={counterContext.legalMoves >= show.legalMoves}
            >
              Legal Moves
            </button>
          </>
        )}
        <button
          className="btn"
          onClick={handleInputMoveSubmit}
          disabled={!myTurn || gameIsOver}
        >
          Submit
        </button>
      </div>

      {showLegalMoves && (
        <div className="moves-grid">
          {chessClient
            .getLegalMoves()
            .map((move) =>
              MoveButtons(
                move,
                formatMove(move, showIfMate, showIfCheck, showIfCapture),
                setInputMove
              )
            )}
        </div>
      )}

      {/* <div className="click-moves">
        {showLegalMoves && (
          <div className="moves-grid">
            {chessClient
              .getLegalMoves()
              .map((move) =>
                MoveButtons(
                  move,
                  formatMove(move, showIfMate, showIfCheck, showIfCapture),
                  setInputMove
                )
              )}
          </div>
        )}

        <button
          className="btn-lg"
          onClick={handleInputMoveSubmit}
          disabled={!myTurn || gameIsOver}
        >
          Submit
        </button>
      </div> */}

      {/* {show.legalMoves && showLegalMoves !== MAX_TIMES && (
        <>
          <button
            className="btn"
            onClick={() => {
              setShowLegalMoves((showLegalMoves) => !showLegalMoves);
              setCounter((counter) => {
                return {
                  ...counter,
                  legalMoves: counterContext.legalMoves + 1,
                };
              });
            }}
            // disabled={counterContext.legalMoves >= show.legalMoves}
          >
            Show Legal Moves
          </button>
          {showLegalMoves && (
            <div className="moves-grid">
              {chessClient
                .getLegalMoves()
                .map((move) =>
                  MoveButtons(
                    move,
                    formatMove(move, showIfMate, showIfCheck, showIfCapture),
                    setInputMove
                  )
                )}
            </div>
          )}
        </>
      )} */}

      <div className="play-buttons">
        <button
          className="btn"
          onClick={handleOfferDraw}
          disabled={
            !myTurn || offerDraw || gameStatus.drawOffered || gameIsOver
          }
        >
          <FontAwesomeIcon icon={faPercentage} />&nbsp;
          Offer Draw
        </button>

        <button
          className="btn"
          onClick={handleRequestTakeback}
          disabled={
            gameIsOver ||
            chessClient.gameHistory().length === 0 ||
            myTurn ||
            requestTakeback ||
            gameStatus.takebackRequested ||
            counterContext.takeback >= timesAllowed.takeback
          }
        >
          <FontAwesomeIcon icon={faArrowLeft} />&nbsp;
          Takeback
        </button>
        <button
          className="btn"
          onClick={handleResignation}
          disabled={gameIsOver}
        >
          <FontAwesomeIcon icon={faHandshake} />&nbsp;
          Resign
        </button>

        <button
          className="btn"
          onClick={handleOfferRematch}
          disabled={!gameIsOver || offerRematch || gameStatus.rematchOffered}
        >
          <FontAwesomeIcon icon={faUndo} />&nbsp;
          Rematch
        </button>
      </div>

      {gameStatus.rematchOffered && !offerRematch && (
        <>
          <span>{oppUsername} offered a rematch</span>
          <button name="Accept" onClick={handleOfferRematchResponse}>
            Accept
          </button>
          <button name="Decline" onClick={handleOfferRematchResponse}>
            Decline
          </button>
        </>
      )}

      {gameStatus.drawOffered && !offerDraw && (
        <>
          <span>{oppUsername} offered a draw</span>
          <button className="btn" name="Accept" onClick={handleOfferDrawResponse}>
            Accept
          </button>
          <button onClick={handleOfferDrawResponse}>Decline</button>
        </>
      )}

      {gameStatus.takebackRequested && !requestTakeback && (
        <>
          <span>{oppUsername} requested a takeback</span>
          <button className="btn" name="Accept" onClick={handleTakebackResponse}>
            Accept
          </button>
          <button onClick={handleTakebackResponse}>Decline</button>
        </>
      )}
    </div>
  );
};

export default Play;
