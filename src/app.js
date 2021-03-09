import BobaFett from "./components/SteveGame/BobaFett";
import { Router, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage';
import store from './store';
import history from './history';
import GameFour from './components/GameFour/GameFour.js';
import LivingRoom from './components/GameFour/LivingRoom.js';
import BackRoom from './components/GameFour/BackRoom';
import HerRoom from './components/GameFour/HerRoom';
import HisRoom from './components/GameFour/HisRoom';
import Attic from './components/GameFour/Attic';

const App = () => {
  return (
    <Provider store={store}>
      <BobaFett/>
      <Router history={history}>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/game4" component={GameFour} />
        <Route exact path="/game4/livingroom" component={LivingRoom} />
        <Route exact path="/game4/herroom" component={HerRoom} />
        <Route exact path="/game4/backroom" component={BackRoom} />
        <Route exact path="/game4/hisroom" component={HisRoom} />
        <Route exact path="/game4/attic" component={Attic} />
      </Router>
    </Provider>
  );
};

export default App;
