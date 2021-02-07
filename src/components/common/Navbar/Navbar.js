import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faQuestion,
  faCog,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="text-link">
          <FontAwesomeIcon icon={faBrain} color={"#ffe0bd"} />
          <span>&nbsp;MindChess</span>
        </Link>
      </div>
      <div className="nav-menu">
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/about">
              <FontAwesomeIcon icon={faInfo} color={"#f0ad4e"} />
              <span>&nbsp;About</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/help">
              <FontAwesomeIcon icon={faQuestion} color={"#5bc0de"} />
              <span>&nbsp;Help</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
