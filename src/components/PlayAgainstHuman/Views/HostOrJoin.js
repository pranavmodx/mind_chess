import React, { useState, useContext } from "react";

import "./HostOrJoin.scss";

import HumanGameContext from "../../../context/humanGame/HumanGameContext";
import SettingsContext from "../../../context/settings/SettingsContext";

import { GAME_CODE_LENGTH } from "../../../config/constants";

const HostOrJoin = ({ setView }) => {
  const [inputCode, setInputCode] = useState("");
  const [inputUsername, setInputUsername] = useState("");

  const humanContext = useContext(HumanGameContext);
  const { setHost, setGameCode } = humanContext;

  const settingsContext = useContext(SettingsContext);
  const {
    setSettings: { setUsername },
  } = settingsContext;

  const hostGame = () => {
    const code = Math.random()
      .toString(36)
      .substr(2, GAME_CODE_LENGTH);
    console.log("Game code :", code);
    // sessionStorage.setItem("gameCode", code);

    setGameCode(code);
    setUsername(inputUsername);
    setHost();
    setView(1);
  };

  const joinGame = () => {
    // sessionStorage.setItem("gameCode", gameCode);
    // if (inputCode.length === GAME_CODE_LENGTH) {
    setGameCode(inputCode);

    setUsername(inputUsername);
    setView(1);
    // }
  };

  return (
    <main>
      <div className="container">
        <div className="container-input">
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>

        <button className="btn-lg mt-5" onClick={hostGame}>
          Host Game
        </button>

        <div className="separator mt-3 mb-3">
          <h2>OR</h2>
        </div>

        <div className="container-input">
          <input
            type="text"
            placeholder="Enter game code"
            onChange={(e) => setInputCode(e.target.value)}
          />
        </div>
        <button className="btn-lg" onClick={joinGame}>
          Join Game
        </button>
      </div>
    </main>
  );
};

export default HostOrJoin;
