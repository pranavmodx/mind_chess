import React, { useContext } from "react";

import SettingsContext from "../../../context/settings/SettingsContext";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./GeneralSettings.scss";

const GeneralSettings = ({ disabled }) => {
  const settingsContext = useContext(SettingsContext);

  const {
    enterByKeyboard,
    show,
    allow,
    colour,
    setSettings: {
      setColour,
      setEnterByKeyboard,
      setShow,
      setAllow,
      setTimesToShow,
      setTimesAllowed,
    },
  } = settingsContext;

  const numOfTimes = [1, 3, 5, Infinity];

  return (
    <div className="gen-settings">
      <table className="settings-table">
        <tbody>
          <tr className="settings-item">
            <td className="settings-attr">
              <h3 className="text">Colour</h3>
            </td>
            <td className="settings-value">
              <div className="btn-group">
                <button
                  className={`btn ${colour === "White" ? "highlight" : ""}`}
                  onClick={() => setColour("White")}
                  disabled={disabled}
                >
                  <h3 className="text">White</h3>
                </button>
                <button
                  className={`btn ${colour === "Black" ? "highlight" : ""}`}
                  onClick={() => setColour("Black")}
                  disabled={disabled}
                >
                  <h3 className="text">Black</h3>
                </button>
              </div>
            </td>
          </tr>

          <tr className="settings-item">
            <td className="settings-attr">
              <h3 className="text">Enter Moves by Keyboard</h3>
            </td>
            <td className="settings-attr">
              <ToggleSwitch
                name="enterByKeyboard"
                id="enterByKeyboard"
                small={true}
                currentValue={enterByKeyboard}
                onChange={setEnterByKeyboard}
                disabled={disabled}
              />
            </td>
          </tr>

          <tr className="settings-item">
            <td className="settings-attr">
              <h3 className="text">Show Moves</h3>
            </td>
            <td className="settings-attr">
              <ToggleSwitch
                name="movesTable"
                id="showMovesTable"
                small={true}
                currentValue={show.movesTable}
                onChange={(e) => setShow(e.target.name)}
                disabled={disabled}
              />
            </td>
          </tr>

          {show.movesTable && (
            <>
              <tr className="settings-item">
                <td className="settings-attr">
                  <h3 className="text">Times to Show Moves</h3>
                </td>
                <td className="settings-attr">
                  <select
                    className="settings-select"
                    name="movesTable"
                    id="timesToShowMovesTable"
                    defaultValue={Infinity}
                    onChange={(e) =>
                      setTimesToShow(e.target.name, Number(e.target.value))
                    }
                    disabled={disabled}
                  >
                    {numOfTimes.map((val, idx) => (
                      <option value={val} key={idx}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr className="settings-item">
                <td className="settings-attr">
                  <h3 className="text">Show Mate</h3>
                </td>
                <td className="settings-attr">
                  <ToggleSwitch
                    name="mate"
                    id="showMate"
                    small={true}
                    currentValue={show.mate}
                    onChange={(e) => setShow(e.target.name)}
                    disabled={disabled}
                  />
                </td>
              </tr>

              <tr className="settings-item">
                <td className="settings-attr">
                  <h3 className="text">Show Checks</h3>
                </td>
                <td className="settings-attr">
                  <ToggleSwitch
                    name="checks"
                    id="showChecks"
                    small={true}
                    currentValue={show.checks}
                    onChange={(e) => setShow(e.target.name)}
                    disabled={disabled}
                  />
                </td>
              </tr>

              <tr className="settings-item">
                <td className="settings-attr">
                  <h3 className="text">Show Captures</h3>
                </td>
                <td className="settings-attr">
                  <ToggleSwitch
                    name="captures"
                    id="showCaptures"
                    small={true}
                    currentValue={show.captures}
                    onChange={(e) => setShow(e.target.name)}
                    disabled={disabled}
                  />
                </td>
              </tr>
            </>
          )}

          <tr className="settings-item">
            <td className="settings-attr">
              <h3 className="text">Show Legal Moves</h3>
            </td>
            <td className="settings-attr">
              <ToggleSwitch
                name="legalMoves"
                id="showLegalMoves"
                small={true}
                currentValue={show.legalMoves}
                onChange={(e) => setShow(e.target.name)}
                disabled={disabled}
              />
            </td>
          </tr>

          {show.legalMoves && (
            <tr className="settings-item">
              <td className="settings-attr">
                <h3 className="text">Times to Show Legal Moves</h3>
              </td>
              <td className="settings-attr">
                <select
                  className="settings-select"
                  name="legalMoves"
                  id="timesToShowLegalMoves"
                  defaultValue={Infinity}
                  onChange={(e) =>
                    setTimesToShow(e.target.name, Number(e.target.value))
                  }
                  disabled={disabled}
                >
                  {numOfTimes.map((val, idx) => (
                    <option value={val} key={idx}>
                      {val}
                    </option>
                  ))}
                  disabled={disabled}
                </select>
              </td>
            </tr>
          )}

          <tr className="settings-item">
            <td className="settings-attr">
              <h3 className="text">Show Board</h3>
            </td>
            <td className="settings-attr">
              <ToggleSwitch
                name="board"
                id="showBoard"
                small={true}
                currentValue={show.board}
                onChange={(e) => setShow(e.target.name)}
                disabled={disabled}
              />
            </td>
          </tr>

          {show.board && (
            <tr className="settings-item">
              <td className="settings-attr">
                <h3 className="text">Times to Show Board</h3>
              </td>
              <td className="settings-attr">
                <select
                  className="settings-select"
                  name="legalMoves"
                  id="timesToShowLegalMoves"
                  defaultValue={Infinity}
                  onChange={(e) =>
                    setTimesToShow(e.target.name, Number(e.target.value))
                  }
                  disabled={disabled}
                >
                  {numOfTimes.map((val, idx) => (
                    <option value={val} key={idx}>
                      {val}
                    </option>
                  ))}
                  disabled={disabled}
                </select>
              </td>
            </tr>
          )}

          <tr className="settings-item">
            <td className="settings-attr">
              <h3 className="text">Allow Illegal Moves</h3>
            </td>
            <td className="settings-attr">
              <ToggleSwitch
                name="illegalMove"
                id="allowIllegalMove"
                small={true}
                currentValue={allow.illegalMove}
                onChange={(e) => setAllow(e.target.name)}
                disabled={disabled}
              />
            </td>
          </tr>

          {allow.illegalMove && (
            <tr className="settings-item">
              <td className="settings-attr">
                <h3 className="text">Times to Allow Illegal Moves</h3>
              </td>
              <td className="settings-attr">
                <select
                  className="settings-select"
                  name="illegalMove"
                  id="timesToAllowIllegalMove"
                  defaultValue={Infinity}
                  onChange={(e) =>
                    setTimesAllowed(e.target.name, Number(e.target.value))
                  }
                  disabled={disabled}
                >
                  {numOfTimes.map((val, idx) => (
                    <option value={val} key={idx}>
                      {val}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          )}

          <tr className="settings-item">
            <td className="settings-attr">
              <h3 className="text">Allow Takebacks</h3>
            </td>
            <td className="settings-attr">
              <ToggleSwitch
                name="takeBack"
                id="allowTakeBack"
                small={true}
                currentValue={allow.takeBack}
                onChange={(e) => setAllow(e.target.name)}
                disabled={disabled}
              />
            </td>
          </tr>

          {allow.takeBack && (
            <tr className="settings-item">
              <td className="settings-attr">
                <h3 className="text">Times to Allow Takebacks</h3>
              </td>
              <td className="settings-attr">
                <select
                  className="settings-select"
                  name="takeBack"
                  id="timesToAllowTakeBack"
                  defaultValue={Infinity}
                  onChange={(e) =>
                    setTimesAllowed(e.target.name, Number(e.target.value))
                  }
                  disabled={disabled}
                >
                  {numOfTimes.map((val, idx) => (
                    <option value={val} key={idx}>
                      {val}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    //   <div className="container">
    //     <div className="setting-item">
    //       <label htmlFor="color">Colour</label>
    //       <div id="color">
    //         <button onClick={() => setColour("White")} disabled={disabled}>
    //           White
    //         </button>
    //         <button onClick={() => setColour("Black")} disabled={disabled}>
    //           Black
    //         </button>
    //       </div>
    //     </div>

    //     <div className="setting-item">
    //       <label htmlFor="enterByKeyboard">Enter Moves by Keyboard</label>
    //       <ToggleSwitch
    //         name="enterByKeyboard"
    //         id="enterByKeyboard"
    //         small={true}
    //         currentValue={enterByKeyboard}
    //         onChange={setEnterByKeyboard}
    //         disabled={disabled}
    //       />
    //     </div>

    //     <div className="setting-item">
    //       <label htmlFor="showMovesTable">Show Moves Table</label>
    //       <ToggleSwitch
    //         name="movesTable"
    //         id="showMovesTable"
    //         small={true}
    //         currentValue={show.movesTable}
    //         onChange={(e) => setShow(e.target.name)}
    //         disabled={disabled}
    //       />
    //     </div>
    //     {show.movesTable && (
    //       <>
    //         <div className="setting-item">
    //           <label htmlFor="timesToShowMovesTable">
    //             Times to Show Moves Table
    //           </label>
    //           <select
    //             name="movesTable"
    //             id="timesToShowMovesTable"
    //             defaultValue={Infinity}
    //             onChange={(e) =>
    //               setTimesToShow(e.target.name, Number(e.target.value))
    //             }
    //             disabled={disabled}
    //           >
    //             {numOfTimes.map((val, idx) => (
    //               <option value={val} key={idx}>
    //                 {val}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //         <div className="setting-item">
    //           <label htmlFor="showMate">Show Mate</label>
    //           <ToggleSwitch
    //             name="mate"
    //             id="showMate"
    //             small={true}
    //             currentValue={show.mate}
    //             onChange={(e) => setShow(e.target.name)}
    //             disabled={disabled}
    //           />
    //         </div>
    //         <div className="setting-item">
    //           <label htmlFor="showChecks">Show Checks</label>
    //           <ToggleSwitch
    //             name="checks"
    //             id="showChecks"
    //             small={true}
    //             currentValue={show.checks}
    //             onChange={(e) => setShow(e.target.name)}
    //             disabled={disabled}
    //           />
    //         </div>
    //         <div className="setting-item">
    //           <label htmlFor="showCaptures">Show Captures</label>
    //           <ToggleSwitch
    //             name="captures"
    //             id="showCaptures"
    //             small={true}
    //             currentValue={show.captures}
    //             onChange={(e) => setShow(e.target.name)}
    //             disabled={disabled}
    //           />
    //         </div>
    //       </>
    //     )}

    //     <div className="setting-item">
    //       <label htmlFor="showLegalMoves">Show Legal Moves</label>
    //       <ToggleSwitch
    //         name="legalMoves"
    //         id="showLegalMoves"
    //         small={true}
    //         currentValue={show.legalMoves}
    //         onChange={(e) => setShow(e.target.name)}
    //         disabled={disabled}
    //       />
    //     </div>
    //     {show.legalMoves && (
    //       <div className="setting-item">
    //         <label htmlFor="timesToShowLegalMoves">
    //           Times to Show Legal Moves
    //         </label>
    //         <select
    //           name="legalMoves"
    //           id="timesToShowLegalMoves"
    //           defaultValue={Infinity}
    //           onChange={(e) =>
    //             setTimesToShow(e.target.name, Number(e.target.value))
    //           }
    //           disabled={disabled}
    //         >
    //           {numOfTimes.map((val, idx) => (
    //             <option value={val} key={idx}>
    //               {val}
    //             </option>
    //           ))}
    //           disabled={disabled}
    //         </select>
    //       </div>
    //     )}

    //     <div className="setting-item">
    //       <label htmlFor="showBoard">Show Board</label>
    //       <ToggleSwitch
    //         name="board"
    //         id="showBoard"
    //         small={true}
    //         currentValue={show.board}
    //         onChange={(e) => setShow(e.target.name)}
    //         disabled={disabled}
    //       />
    //     </div>
    //     {show.board && (
    //       <div className="setting-item">
    //         <label htmlFor="timesToShowBoard">Times to Show Board</label>
    //         <select
    //           name="board"
    //           id="timesToShowBoard"
    //           defaultValue={Infinity}
    //           onChange={(e) =>
    //             setTimesToShow(e.target.name, Number(e.target.value))
    //           }
    //           disabled={disabled}
    //         >
    //           {numOfTimes.map((val, idx) => (
    //             <option value={val} key={idx}>
    //               {val}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //     )}

    //     <div className="setting-item">
    //       <label htmlFor="allowIllegalMove">Allow Illegal Move</label>
    //       <ToggleSwitch
    //         name="illegalMove"
    //         id="allowIllegalMove"
    //         small={true}
    //         currentValue={allow.illegalMove}
    //         onChange={(e) => setAllow(e.target.name)}
    //         disabled={disabled}
    //       />
    //     </div>
    //     {allow.illegalMove && (
    //       <div className="setting-item">
    //         <label htmlFor="timesToAllowIllegalMove">
    //           Times to Allow Illegal Moves
    //         </label>
    //         <select
    //           name="illegalMove"
    //           id="timesToAllowIllegalMove"
    //           defaultValue={Infinity}
    //           onChange={(e) =>
    //             setTimesAllowed(e.target.name, Number(e.target.value))
    //           }
    //           disabled={disabled}
    //         >
    //           {numOfTimes.map((val, idx) => (
    //             <option value={val} key={idx}>
    //               {val}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //     )}

    //     <div className="setting-item">
    //       <label htmlFor="allowTakeBack">Allow Take Back</label>
    //       <ToggleSwitch
    //         name="takeBack"
    //         id="allowTakeBack"
    //         small={true}
    //         currentValue={allow.takeBack}
    //         onChange={(e) => setAllow(e.target.name)}
    //         disabled={disabled}
    //       />
    //     </div>
    //     {allow.takeBack && (
    //       <div className="setting-item">
    //         <label htmlFor="timesToAllowTakeBack">
    //           Times to Allow Take Backs
    //         </label>
    //         <select
    //           name="takeBack"
    //           id="timesToAllowTakeBack"
    //           defaultValue={Infinity}
    //           onChange={(e) =>
    //             setTimesAllowed(e.target.name, Number(e.target.value))
    //           }
    //           disabled={disabled}
    //         >
    //           {numOfTimes.map((val, idx) => (
    //             <option value={val} key={idx}>
    //               {val}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //     )}
    //   </div>
  );
};

export default GeneralSettings;
