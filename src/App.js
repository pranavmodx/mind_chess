import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GameState from "./context/game/GameState";
import HumanGameState from "./context/humanGame/HumanGameState";
import P2PState from "./context/P2P/P2PState";
import SettingsState from "./context/settings/SettingsState";
import CounterState from "./context/counter/CounterState";

import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";

import Home from "./pages/Home/Home";
import PlayAgainstFriend from "./pages/PlayAgainstHuman/PlayAgainstFriend";
import PlayAgainstComp from "./pages/PlayAgainstComp/PlayAgainstComp";
import NotFound from "./pages/NotFound/NotFound";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <GameState>
            <SettingsState>
              <CounterState>
                <Route path="/mind_chess" component={Home} />
                <Route path="/mind_chess/play/friend">
                {/* <Route exact path="/"> */}
                  <HumanGameState>
                    <P2PState>
                      <PlayAgainstFriend />
                    </P2PState>
                  </HumanGameState>
                </Route>
                {/* <Route exact path="/play/random" component={PlayAgainstRandomOpp} /> */}
                {/* <Route exact path="/play/comp" component={PlayAgainstComp} /> */}
              </CounterState>
            </SettingsState>
          </GameState>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
