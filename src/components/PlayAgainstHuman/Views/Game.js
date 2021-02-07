import React, { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faChessBoard,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

import SettingsContext from "../../../context/settings/SettingsContext";
import CounterContext from "../../../context/counter/CounterContext";

import Play from "../../../components/PlayAgainstHuman/GameTabs/Play/Play";
import MoveTable from "../../../components/common/GameTabs/MoveTable/MoveTable";
import Board from "../../../components/common/GameTabs/Board/Board";

const Game = () => {
  // 0 -> Play, 1 -> Move, 2 -> Board
  const [gameTab, setGameTab] = useState(0);

  const settingsContext = useContext(SettingsContext);
  const { show } = settingsContext;

  const counterContext = useContext(CounterContext);
  const {
    decrementCounter,
    board: boardCounter,
    movesTable: movesTableCounter,
  } = counterContext;

  return (
    <div>
      <div className="game-tab">
        <button className="play-tab" onClick={() => setGameTab(0)}>
          <FontAwesomeIcon icon={faPlay} />
          &nbsp;Play
        </button>

        <button
          className="moves-tab"
          onClick={() => {
            if (show.movesTable & (movesTableCounter > 0)) {
              setGameTab(1);
              decrementCounter("movesTable");
            }
          }}
        >
          <FontAwesomeIcon icon={faClipboard} />
          &nbsp;Moves
        </button>

        <button
          className="board-tab"
          onClick={() => {
            if (show.board & (boardCounter > 0)) {
              setGameTab(2);
              decrementCounter("board");
            }
          }}
          disabled={!show.board}
        >
          <FontAwesomeIcon icon={faChessBoard} />
          &nbsp;Board
        </button>
      </div>

      {gameTab === 0 && (
        <div className="game-tab-content">
          <Play />
        </div>
      )}

      {gameTab === 1 && (
        <div className="game-tab-content">
          <MoveTable />
        </div>
      )}

      {gameTab === 2 && (
        <div className="game-tab-content">
          <Board />
        </div>
      )}
    </div>
  );
};

export default Game;
