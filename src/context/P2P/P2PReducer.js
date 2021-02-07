import { SET_P2PT, SET_OPP_PEER_OBJ } from "../types";

const P2PReducer = (state, action) => {
  switch (action.type) {
    case SET_P2PT:
      return { ...state, p2pt: action.payload };
    case SET_OPP_PEER_OBJ:
      return { ...state, oppPeerObj: action.payload };
    default:
      return { ...state };
  }
};

export default P2PReducer;
