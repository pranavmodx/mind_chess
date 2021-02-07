import React, { useReducer } from "react";

import CounterContext from "./CounterContext";
import CounterReducer from "./CounterReducer";

import { SET_ALL_COUNTERS, SET_COUNTER, DECREMENT_COUNTER } from "../types";

const CounterState = (props) => {
  const initialState = {
    legalMoves: Infinity,
    movesTable: Infinity,
    board: Infinity,
    illegalMoves: Infinity,
    takebacks: Infinity,
  };

  const [state, dispatch] = useReducer(CounterReducer, initialState);

  const setAllCounters = (allCounters) => {
    dispatch({ type: SET_ALL_COUNTERS, payload: allCounters });
  };

  const setCounter = (counterName, counterValue) => {
    dispatch({ type: SET_COUNTER, payload: { counterName, counterValue } });
  };

  const decrementCounter = (counterName) => {
    dispatch({ type: DECREMENT_COUNTER, payload: { counterName } });
  };

  return (
    <CounterContext.Provider
      value={{
        legalMoves: state.legalMoves,
        movesTable: state.movesTable,
        board: state.board,
        illegalMoves: state.illegalMoves,
        takebacks: state.takebacks,
        setAllCounters,
        setCounter,
        decrementCounter,
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterState;
