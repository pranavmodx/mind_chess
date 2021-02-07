import React, { useContext } from "react";

import { formatMove } from "../../../../helper/FormatMove";

import GameContext from "../../../../context/game/GameContext";
import SettingsContext from "../../../../context/settings/SettingsContext";

import "./MoveTable.scss";

const MoveTable = () => {
  const gameContext = useContext(GameContext);
  const { movesPgn } = gameContext;

  const settingsContext = useContext(SettingsContext);
  const {
    show: { mate: showIfMate, captures: showIfCapture, checks: showIfCheck },
  } = settingsContext;

  const defaultGetRows = (movetext) => {
    let ms = movetext;
    if (!ms) {
      return [];
    }
    /* delete comments */
    ms = ms.replace(/(\{[^}]+\})+?/g, "");

    /* delete recursive annotation variations */
    const ravRegex = /(\([^\(\)]+\))+?/g;
    while (ravRegex.test(ms)) {
      ms = ms.replace(ravRegex, "");
    }

    /* delete numeric annotation glyphs */
    ms = ms.replace(/\$\d+/g, "");

    /* Delete result */
    ms = ms.replace(/(?:1-0|0-1|1\/2-1\/2|\*)$/, "");

    /* Delete any double spaces */
    ms = ms.replace(/\s\s/g, " ").trim();

    /* Split into rows */
    const rows = [];
    const rowRegex = /\d+\.\s?\S+(?:\s+\S+)?/g;
    while (true) {
      const result = rowRegex.exec(ms);
      if (!result) {
        break;
      }
      const row = result[0].split(/\s|\.\s?/g);
      row[0] = parseInt(row[0]);
      rows.push(row);
    }
    return rows;
  };

  const getMoves = () => defaultGetRows(movesPgn);

  const rowMapper = (row) => {
    let moveNumber = row[0],
      white = row[1]
        ? formatMove(row[1], showIfMate, showIfCheck, showIfCapture)
        : row[1],
      black = row[2]
        ? formatMove(row[2], showIfMate, showIfCheck, showIfCapture)
        : row[2];

    let moveObj = {
      key: moveNumber,
      moveNumber,
      white,
      black,
    };

    return moveObj;
  };

  const getAllMoves = () => getMoves().map(rowMapper);

  let moves = getAllMoves();
  console.log(moves);

  // return moves.length === 0 ? (
  //   <div style={{ textAlign: "center" }}>No moves yet</div>
  // ) : (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Move No.</th>
  //         <th>White</th>
  //         <th>Black</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {moves.map((move, idx) => (
  //         <tr key={idx}>
  //           <td>{move.moveNumber}</td>
  //           <td>{move.white}</td>
  //           <td>{move.black}</td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );

  return (
    <div className="move">
      <table className="">
        <thead>
          <tr>
            <th>Move No.</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move, idx) => (
            <tr key={idx}>
              <td>{move.moveNumber}</td>
              <td>{move.white}</td>
              <td>{move.black}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoveTable;
