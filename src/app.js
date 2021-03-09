
import BobaFett from "./components/SteveGame/BobaFett";

import { Router, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage';
import store from './store';
import history from './history';

import { HauntedRoom1 } from './components/Haunted/HauntedRoom1';
import { HauntedRoom2 } from './components/Haunted/HauntedRoom2';
import { HauntedRoom3 } from './components/Haunted/HauntedRoom3';
import { HauntedIntro } from './components/Haunted/HauntedIntro';
import { Success } from './components/Haunted/HauntedR2Success';

import GameFour from './components/GameFour/GameFour.js';
import LivingRoom from './components/GameFour/LivingRoom.js';
import BackRoom from './components/GameFour/BackRoom';
import HerRoom from './components/GameFour/HerRoom';
import HisRoom from './components/GameFour/HisRoom';
import Attic from './components/GameFour/Attic';

import BankGameLevel2 from './components/BankGame/BankGameLevel2';
import BankGameLevel3 from './components/BankGame/BankGameLevel3';
import BankGameStart from './components/BankGame/BankGameStart';
import BankGameVictory from './components/BankGame/BankGameVictory';



const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={Homepage} />
        <Route exact path ="/Bobafett" component={BobaFett} />
        <Route exact path="/haunted/intro" component={HauntedIntro} />
        <Route exact path="/haunted/room1" component={HauntedRoom1} />
        <Route exact path="/haunted/room2" component={HauntedRoom2} />
        <Route exact path="/haunted/room3" component={HauntedRoom3} />
        <Route exact path="/haunted/room2/success" component={Success} />

        <Route exact path="/game4" component={GameFour} />
        <Route exact path="/game4/livingroom" component={LivingRoom} />
        <Route exact path="/game4/herroom" component={HerRoom} />
        <Route exact path="/game4/backroom" component={BackRoom} />
        <Route exact path="/game4/hisroom" component={HisRoom} />
        <Route exact path="/game4/attic" component={Attic} />

        <Route exact path="/Bankgame" component={BankGameStart} />
        <Route exact path="/Bankgame2" component={BankGameLevel2} />
        <Route exact path="/Bankgame3" component={BankGameLevel3} />
        <Route exact path="/BankgameVictory" component={BankGameVictory} />
        <Redirect to="/" />

      </Router>
    </Provider>

  );
};

export default App;
