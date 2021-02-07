import React from "react";

import "./EngineSettings.scss";

import { getStockfishLevels } from "../../../../../../helper/Engine";

const EngineSettings = ({
  currentEngineSettings,
  setEngineSettings,
  setEngineSettingsMade,
}) => {
  const stockfishLevels = getStockfishLevels();

  const handleStockfishLevel = (e) => {
    setEngineSettings({
      ...currentEngineSettings,
      stockfishLevel: e.target.value,
    });
  };

  const optionsTag = (elo) => {
    return (
      <option
        key={elo}
        value={elo}
        defaultValue={currentEngineSettings.stockfishLevel}
      >
        {elo}
      </option>
    );
  };

  const toggleSetting = (e) => {
    const settingName = e.target.name;
    const settingValue = e.target.value;

    console.log(settingName);

    switch (settingName) {
      case "stockfishLevel":
        setEngineSettings({
          ...currentEngineSettings,
          stockfishLevel: settingValue,
        });
        break;
      default:
        break;
    }
  };

  const radioTag = (settingName, value = ["Yes", "No"]) => {
    return (
      <div onChange={toggleSetting}>
        <input
          type="radio"
          name={settingName}
          defaultChecked="true"
          value={value[0]}
        />
        {value[0]}
        <input type="radio" name={settingName} value={value[1]} /> {value[1]}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEngineSettingsMade(true);
  };

  return (
    <div className="setting-tab-content">
      <span>Choose Stockfish Level</span>
      <select
        value={currentEngineSettings.stockfishLevel}
        onChange={handleStockfishLevel}
      >
        {stockfishLevels.map(optionsTag)}
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EngineSettings;
