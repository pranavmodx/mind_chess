import React, { useContext } from "react";

import Chessboard from "chessboardjsx";
// import { Chessboard } from "@chrisoakman/chessboardjs/dist/chessboard-1.0.0";

import GameContext from "../../../../context/game/GameContext";

import "./Board.scss";

const Board = () => {
  const gameContext = useContext(GameContext);

  const { movesFen } = gameContext;

  const screenWidth = window.screen.width;

  return (
    <div className="board">
      <Chessboard
        position={movesFen}
        draggable={false}
        width={screenWidth < 500 ? 300: 500}
      />
    </div>
  );
};

export default Board;
