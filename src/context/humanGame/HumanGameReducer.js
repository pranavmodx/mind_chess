import {
  SET_OPP_USERNAME,
  SET_OPP_START_GAME,
  SET_RECEIVED_SETTINGS,
  SET_HOST,
  SET_GAME_CODE,
  SET_HUMAN_GAME_STATUS,
  SET_OFFER_DRAW, 
  SET_OFFER_REMATCH, 
  SET_REQUEST_TAKEBACK,
  RESET_HUMAN_GAME_STATE,
} from "../types";

const HumanGameReducer = (state, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SET_OPP_USERNAME:
      return { ...state, oppUsername: payload };

    case SET_OPP_START_GAME:
      return { ...state, oppStartGame: payload };

    case SET_RECEIVED_SETTINGS:
      return { ...state, receivedSettings: payload };

    case SET_HOST:
      return { ...state, isHost: true };

    case SET_GAME_CODE:
      return { ...state, gameCode: payload };

    case SET_HUMAN_GAME_STATUS:
      return { ...state, gameStatus: payload };

    case SET_OFFER_DRAW:
      return { ...state, offerDraw: payload };

    case SET_OFFER_REMATCH:
      return { ...state, offerRematch: payload };

    case SET_REQUEST_TAKEBACK:
      return { ...state, requestTakeback: payload };

    case RESET_HUMAN_GAME_STATE:
      return { ...state, ...payload };
      
    default:
      return { ...state };
  }
};

export default HumanGameReducer;
