import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faUsers,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

import "./Home.scss";

const Home = () => {
  return (
    <main className="main-home">
      <div className="home-container">
        <button className="btn-lg is-left">
          <Link to="/play/friend">
            <FontAwesomeIcon icon={faUserFriends} />
            <span>&nbsp;Play against Friend</span>
          </Link>
        </button>
        {/* <button className="btn-lg is-left">
          <Link to="/play/random">
            <FontAwesomeIcon icon={faUsers} />
            <span>&nbsp;Play against Random Opponent</span>
          </Link>
        </button> */}
        {/* <button className="btn-lg is-left">
          <Link to="/play/comp">
            <FontAwesomeIcon icon={faDesktop} />
            <span>&nbsp;Play against Stockfish Computer</span>
          </Link>
        </button> */}
      </div>
    </main>
  );
};

export default Home;
