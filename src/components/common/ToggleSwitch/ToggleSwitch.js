import React from "react";

import "./ToggleSwitch.scss";

const ToggleSwitch = ({
  name,
  id,
  currentValue,
  defaultChecked,
  disabled,
  onChange,
  small,
  text,
}) => {
  return (
    <div className={"toggle-switch" + (small ? " small-switch" : "")}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={currentValue}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
      />
      {id ? (
        <label className="toggle-switch-label" htmlFor={id}>
          <span
            className={
              disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={text[0]}
            data-no={text[1]}
          />
          <span
            className={
              disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
            }
          />
        </label>
      ) : null}
    </div>
  );
};

ToggleSwitch.defaultProps = {
  text: ["Yes", "No"],
};

export default ToggleSwitch;
