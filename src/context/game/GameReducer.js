import {
  SET_CHESS_CLIENT,
  SET_START_GAME,
  SET_MOVES_PGN,
  SET_MOVES_FEN,
  SET_MY_TURN,
  SET_GAME_STATUS,
  RESET_GAME_STATE,
} from "../types";

const GameReducer = (state, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SET_CHESS_CLIENT:
      return { ...state, chessClient: payload };

    case SET_START_GAME:
      return { ...state, startGame: payload };

    case SET_MOVES_PGN:
      return { ...state, movesPgn: payload };

    case SET_MOVES_FEN:
      return { ...state, movesFen: payload };

    case SET_MY_TURN:
      return { ...state, myTurn: payload };

    case SET_GAME_STATUS:
      return { ...state, gameStatus: payload };

    case RESET_GAME_STATE:
      return { ...state, ...payload };

    default:
      return { ...state };
  }
};

export default GameReducer;
