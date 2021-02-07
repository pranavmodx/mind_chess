export const formatMove = (move, showIfMate, showIfCheck, showIfCapture) => {
  let formattedMove = move;

  if (!showIfMate) {
    formattedMove = formattedMove.replace("#", "");
  }
  if (!showIfCheck) {
    formattedMove = formattedMove.replace("+", "");
  }
  if (!showIfCapture) {
    formattedMove = formattedMove.replace("x", "");
  }

  return formattedMove;
};
