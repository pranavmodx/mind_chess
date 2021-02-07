import React, { useState } from "react";

import "./Settings.scss";

import GeneralSettings from "../../../common/Settings/GeneralSettings";
import EngineSettings from "./SettingTabs/EngineSettings/EngineSettings";

const Settings = () => {
  // 0 -> General, 1 -> Engine
  const [settingTab, setSettingTab] = useState(0);

  return (
    <div className="settings">
      <div className="setting-tab">
        <button className="general-tab" onClick={() => setSettingTab(0)}>
          &nbsp;General
        </button>
        <button className="engine-tab" onClick={() => setSettingTab(1)}>
          &nbsp;Engine
        </button>
      </div>
      {settingTab === 0 && <GeneralSettings />}
      {settingTab === 1 && <EngineSettings />}
    </div>
  );
};

export default Settings;
