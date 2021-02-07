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

const SettingsReducer = (state, action) => {
  const { settings, settingName, settingValue } = action.payload || {};
  const { show, timesToShow, allow, timesAllowed } = state;

  let curSettingValue;

  switch (action.type) {
    case SET_ALL_SETTINGS:
      return { ...state, ...settings };

    case SET_COLOUR:
      return { ...state, colour: settingValue };

    case SET_USERNAME:
      return { ...state, username: settingValue };

    case SET_ENTER_BY_KEYBOARD:
      const enterByKeyboard = state.enterByKeyboard;
      return { ...state, enterByKeyboard: !enterByKeyboard };

    case SET_SHOW:
      curSettingValue = show[settingName];
      return { ...state, show: { ...show, [settingName]: !curSettingValue } };

    case SET_TIMES_TO_SHOW:
      return {
        ...state,
        timesToShow: { ...timesToShow, [settingName]: settingValue },
      };

    case SET_ALLOW:
      curSettingValue = allow[settingName];
      return { ...state, allow: { ...allow, [settingName]: !curSettingValue } };

    case SET_TIMES_ALLOWED:
      return {
        ...state,
        timesAllowed: { ...timesAllowed, [settingName]: settingValue },
      };

    default:
      return { ...state };
  }
};

export default SettingsReducer;
