// try {
//   var sf = new Worker("./stockfish.js");
// } catch (err) {
//   sf = {};
// }

// sf.onmessage = (event) => {};

// export const getBestMove = (level, fen, callback) => {
//   sf.postMessage("position fen " + fen);
//   sf.postMessage("setoption name Skill Level value " + level);
//   sf.postMessage("go depth 2");
//   sf.onmessage = (event) => {
//     if (event.data.startsWith("bestmove")) {
//       const move = event.data.split(" ")[1];
//       return callback(move);
//     }
//   };
// };

// export const getStockfishLevels = () => {
//   var values = [];
//   const numLevels = 20;
//   const minElo = 1100;
//   const maxElo = 3100;
//   for (var i = 0; i <= numLevels; i++) {
//     const elo =
//       Math.floor((minElo + (maxElo - minElo) * (i / numLevels)) / 100) * 100;
//     values.push(elo);
//   }
//   return values;
// };
