import React, { useContext } from "react";

import useP2Pt from "../../../hooks/useP2Pt";
import { SIGNAL_TYPES } from "../../../hooks/types";

import CircleLoader from "react-spinners/CircleLoader";

import P2PContext from "../../../context/P2P/P2PContext";
import GameContext from "../../../context/game/GameContext";
import HumanGameContext from "../../../context/humanGame/HumanGameContext";
import SettingsContext from "../../../context/settings/SettingsContext";
import CounterContext from "../../../context/counter/CounterContext";

import GeneralSettings from "../../common/Settings/GeneralSettings";

import "./Lobby.scss";

const Lobby = () => {
  const gameContext = useContext(GameContext);
  const { startGame, setStartGame, setMyTurn } = gameContext;

  const humanGameContext = useContext(HumanGameContext);
  const {
    gameCode,
    isHost,
    oppUsername,
    oppStartGame,
    receivedSettings,
  } = humanGameContext;

  const settingsContext = useContext(SettingsContext);
  const {
    username: myUsername,
    colour,
    timesToShow,
    timesAllowed,
  } = settingsContext;

  const counterContext = useContext(CounterContext);
  const { setAllCounters } = counterContext;

  const p2pContext = useContext(P2PContext);
  const { p2pt, oppPeerObj, sendSignal, sendSettings } = p2pContext;

  console.log(oppUsername);

  useP2Pt();

  const handleStartGame = () => {
    if (oppPeerObj) {
      if (isHost) sendSettings(settingsContext);

      sendSignal(SIGNAL_TYPES.START_GAME);

      if (colour === "White") setMyTurn(true);
      else setMyTurn(false);

      setAllCounters({ timesToShow, timesAllowed });
      setStartGame(true);
    } else {
      console.log("wait till peer connects");
    }
  };

  return (
    <div className="lobby">
      {!p2pt ? (
        <div className="lobby-loading">
          <h2 className="sub-heading mb-3">
            {isHost ? <span>Hosting game</span> : <span>Joining game</span>}...
            Please wait
          </h2>
          <CircleLoader />
        </div>
      ) : (
        <div className="lobby-container">
          <h1 className="heading">Lobby</h1>
          <div className="lobby-settings-pane">
            <h2 className="sub-heading">Game Settings</h2>
            <GeneralSettings
              disabled={isHost ? (!startGame ? false : true) : true}
            />
          </div>
          <div className="lobby-users-pane">
            <h2 className="sub-heading">Players</h2>
            <table className="users-table">
              <thead>
                <tr className="users-item">
                  <th className="t-header users-attr">
                    <h3 className="text text-md wt-500">Name</h3>
                  </th>
                  <th className="t-header users-attr">
                    <h3 className="text text-md wt-500">Status</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="users-item">
                  <td className="text users-attr">{myUsername}</td>
                  <td className="text users-attr">
                    {startGame ? "Ready" : "Not Ready"}
                  </td>
                </tr>
                <tr className="users-item">
                  <td className="text users-attr">
                    {oppUsername.length !== 0 ? oppUsername : "Waiting..."}
                  </td>
                  <td className="text users-attr">
                    {oppUsername.length !== 0
                      ? oppStartGame
                        ? "Ready"
                        : "Not Ready"
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 className="text mt-3">
              <strong>Game Code</strong> : {gameCode}
            </h3>
          </div>
          <div className="lobby-action-pane">
            <button
              className="btn"
              onClick={handleStartGame}
              disabled={
                isHost ? (oppPeerObj ? startGame : true) : !receivedSettings
              }
            >
              Start Game
            </button>
            {isHost && startGame && (
              <h3 className="text">Please wait for the opponent to be ready</h3>
            )}
            {!isHost && !receivedSettings && (
              <h3 className="text">
                Please wait for the opponent to configure the settings
              </h3>
            )}
            {!isHost && receivedSettings && (
              <h3 className="text">
                Click Start Game to let the opponent know you're ready!
              </h3>
            )}
          </div>
        </div>
      )}
    </div>

    // <div className="lobby-grid">
    //   {!p2pt ? (
    //     <div className="lobby-container">
    //       <h4>
    //         {isHost ? <span>Hosting</span> : <span>Joining</span>} the game...
    //         Please wait
    //       </h4>
    //       {/* some spinner here */}
    //     </div>
    //   ) : (
    //     <div className="lobby-settings-pane">
    //       <GeneralSettings
    //         disabled={isHost ? (!startGame ? false : true) : true}
    //       />
    //       {!isHost ? (
    //         <>
    //           <h5>
    //             Once your friend {oppUsername} is done adding the settings, you
    //             can click start game
    //           </h5>

    //           <button
    //             onClick={handleStartGame}
    //             disabled={
    //               !receivedSettings
    //             } /* start game can only be hit once, to avoid multiple change of settings */
    //           >
    //             Start Game
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <button
    //             onClick={handleStartGame}
    //             disabled={
    //               startGame
    //             } /* start game can only be hit once, to avoid multiple change of settings */
    //           >
    //             Start Game
    //           </button>
    //           {startGame && <h2>Please wait for {oppUsername} to be ready</h2>}
    //         </>
    //       )}
    //     </div>
    //   )}
    // </div>
  );
};

export default Lobby;
