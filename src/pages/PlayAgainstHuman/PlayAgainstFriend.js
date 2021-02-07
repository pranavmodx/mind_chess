import React, { useState, useContext } from "react";

import "./PlayAgainstHuman.scss";

import GameContext from "../../context/game/GameContext";
import HumanGameContext from "../../context/humanGame/HumanGameContext";

import HostOrJoin from "../../components/PlayAgainstHuman/Views/HostOrJoin";
import Lobby from "../../components/PlayAgainstHuman/Views/Lobby";
import Game from "../../components/PlayAgainstHuman/Views/Game";

const PlayAgainstFriend = (props) => {
  // 0 -> Host/Join, 1 -> Lobby/Game
  const [view, setView] = useState(0);

  const gameContext = useContext(GameContext);
  const { startGame } = gameContext;

  const humanGameContext = useContext(HumanGameContext);
  const { oppStartGame } = humanGameContext;

  return (
    <main>
      {view === 0 && <HostOrJoin setView={setView} />}
      {view === 1 && (!startGame || !oppStartGame) && (
        <Lobby setView={setView} />
      )}
      {view === 1 && startGame && oppStartGame && <Game setView={setView} />}
    </main>
  );
};

export default PlayAgainstFriend;
