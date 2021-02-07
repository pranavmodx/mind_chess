import React from "react";

import "./MoveButtons.scss";

const MoveButtons = (move, formattedMove, setInputMove) => {
  return (
    <div className="move-button">
      <button className="btn" key={move} onClick={() => setInputMove(move)}>
        {formattedMove}
      </button>
    </div>
  );
};

export default MoveButtons;
