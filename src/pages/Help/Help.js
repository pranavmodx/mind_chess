import React from "react";

import "./Help.scss";

const Help = () => {
  return (
    <main className="help">
      <p className="para-bold">How do I play?</p>
      <p className="para">
        It's simple. You can either host or join a game. Upon hosting, a unique
        game code is generated which can be used by your friend to join the game
        or vice versa.
      </p>

      <p className="para-bold">Not able to play!</p>
      <p className="para">
        Some unknown issues exist with a few routers and internet service
        providers for making P2P connections to other players. Try using a
        different browser or internet connection.
      </p>

      <p className="para-bold">Privacy</p>
      <p className="para">
        No personal information about you is shared with anyone. Only the
        username is sent to the other player for authenticity.
      </p>
    </main>
  );
};

export default Help;
