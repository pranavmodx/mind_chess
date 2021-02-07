import Chess from "chess.js";

import { STARTING_FEN } from "../config/constants";

export const newChessClient = (fen = STARTING_FEN) => new Chess(fen);

const gameStatus = {
  starting: {main: "New Game", reason: null},
  active: {main: "Active Game", reason: null},
  whiteWon: {main: "White Won", reason: "Checkmate"},
  blackWon: {main: "Black Won", reason: "Checkmate"},
  drawByStalemate: {main: "Draw", reason: "Stalemate"},
  drawByRepetition: {main: "Draw", reason: "Threefold Repetition"},
  drawByInsufficientMaterial: {main: "Draw", reason: "Insufficient Material"},
  drawBy50MoveRule: {main: "Draw", reason: "50 Move Rule"},
};

export class ChessClient {
  constructor(fen = STARTING_FEN) {
    this.client = newChessClient(fen);
  }

  reset = () => this.client.reset();

  move = (mv) => this.client.move(mv, { sloppy: true });

  isValidMove = (move) => {
    const tempClient = newChessClient(this.client.fen());
    const result = tempClient.move(move, { sloppy: true });

    return result != null;
  };

  getLegalMoves = () => this.client.moves();

  getMoveHistory = () => this.client.history();

  undoMove = () => this.client.undo();

  getPgn = () => this.client.pgn();
  getFen = () => this.client.fen();

  gameHistory = () => this.client.history();

  loadPosition = (pgn) => this.client.load(pgn);

  getStatus = () => {
    const client = this.client;

    if (client.history().length === 0) return gameStatus.starting;

    if (client.in_checkmate())
      return client.turn() === "b" ? gameStatus.whiteWon : gameStatus.blackWon;

    if (client.in_stalemate()) return gameStatus.drawByStalemate;

    if (client.in_threefold_repetition()) return gameStatus.drawByRepetition;

    if (client.insufficient_material())
      return gameStatus.drawByInsufficientMaterial;

    if (client.in_draw()) return gameStatus.drawBy50MoveRule;

    return gameStatus.active;
  };
}
