import { SET_ALL_COUNTERS, SET_COUNTER, DECREMENT_COUNTER } from "../types";

const CounterReducer = (state, action) => {
  const {
    counterName,
    counterValue,
    timesToShow,
    timesAllowed,
  } = action.payload;
  const curCounterValue = state[counterName];

  switch (action.type) {
    case SET_ALL_COUNTERS:
      return { ...state, ...timesToShow, ...timesAllowed };
    case SET_COUNTER:
      return { ...state, [counterName]: counterValue };

    case DECREMENT_COUNTER:
      return { ...state, [counterName]: curCounterValue - 1 };

    default:
      return { ...state };
  }
};

export default CounterReducer;
