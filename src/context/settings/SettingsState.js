import React, { useReducer } from "react";

import { MAX_TIMES } from "../../config/constants";

import SettingsContext from "./SettingsContext";
import SettingsReducer from "./SettingsReducer";

import {
  SET_ALL_SETTINGS,
  SET_COLOUR,
  SET_USERNAME,
  SET_ENTER_BY_KEYBOARD,
  SET_SHOW,
  SET_TIMES_TO_SHOW,
  SET_ALLOW,
  SET_TIMES_ALLOWED,
} from "../types";

const SettingsState = (props) => {
  const initialState = {
    username: "",
    colour: "White",
    enterByKeyboard: true,
    show: {
      legalMoves: false,
      movesTable: true,
      board: true,
      mate: true,
      checks: true,
      captures: true,
    },
    timesToShow: {
      legalMoves: MAX_TIMES,
      movesTable: MAX_TIMES,
      board: MAX_TIMES,
    },
    allow: {
      illegalMove: true,
      takeBack: true,
    },
    timesAllowed: {
      illegalMove: MAX_TIMES,
      takeBack: MAX_TIMES,
    },
    illegalMoveLoss: false,
  };

  const [state, dispatch] = useReducer(SettingsReducer, initialState);

  const setAllSettings = (settings) => {
    dispatch({ type: SET_ALL_SETTINGS, payload: { settings } });
  };

  const setUsername = (username) => {
    dispatch({ type: SET_USERNAME, payload: { settingValue: username } });
  };

  const setColour = (colour) => {
    dispatch({ type: SET_COLOUR, payload: { settingValue: colour } });
  };

  const setEnterByKeyboard = () => {
    dispatch({ type: SET_ENTER_BY_KEYBOARD, payload: null });
  };

  const setShow = (settingName) => {
    dispatch({ type: SET_SHOW, payload: { settingName } });
  };

  const setTimesToShow = (settingName, times) => {
    dispatch({
      type: SET_TIMES_TO_SHOW,
      payload: { settingName, settingValue: times },
    });
  };

  const setAllow = (settingName) => {
    dispatch({ type: SET_ALLOW, payload: { settingName } });
  };

  const setTimesAllowed = (settingName, times) => {
    dispatch({
      type: SET_TIMES_ALLOWED,
      payload: { settingName, settingValue: times },
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        username: state.username,
        colour: state.colour,
        enterByKeyboard: state.enterByKeyboard,
        show: state.show,
        timesToShow: state.timesToShow,
        allow: state.allow,
        timesAllowed: state.timesAllowed,
        setSettings: {
          setAllSettings,
          setColour,
          setUsername,
          setEnterByKeyboard,
          setShow,
          setTimesToShow,
          setAllow,
          setTimesAllowed,
        },
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsState;
