import React from "react";

import "./About.scss";

const About = () => {
  return (
    <main className="about">
      <p className="para">
      <span className="para-bold">Mind Chess</span> is a simple online realtime multiplayer blindfold chess web
        application.
      </p>
      <p className="para">
        <span className="para-bold">Blindfold Chess</span> is a form of chess play wherein the players do not see
        the positions of the pieces. This forces players to maintain a mental
        model of the positions of the pieces. Moves are communicated via a
        recognized <span className="para-bold">Chess Notation</span>.
      </p>
      <p className="para">
        The web app enables you to play with your friends via <span className="para-bold">P2P Connections </span> 
        established through a unique game code generated when one hosts a game.
        The friend can join the game using this code.
      </p>
      <p className="para">
        Learn more : <a href="https://en.wikipedia.org/wiki/Blindfold_chess">Wiki</a>
      </p>
    </main>
  );
};

export default About;
