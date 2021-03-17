import BobaFett from './components/SteveGame/BobaFett';

import { Router, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage';
import store from './store';
import history from './history';

import { HauntedRoom1 } from './components/Haunted/HauntedRoom1';
import { HauntedRoom2 } from './components/Haunted/HauntedRoom2';
import { HauntedRoom3 } from './components/Haunted/HauntedRoom3';
import { HauntedRoom4 } from './components/Haunted/HauntedRoom4';
import { HauntedRoom5 } from './components/Haunted/HauntedRoom5';
import { HauntedIntro } from './components/Haunted/HauntedIntro';
import { Success } from './components/Haunted/HauntedR2Success';
import { HauntedRoom6 } from './components/Haunted/HauntedRoom6';
import { HauntedRoom7 } from './components/Haunted/HauntedRoom7';

import HouseOfRiddlez from './components/HouseOfRiddlez/HouseOfRiddlez';
import LivingRoom from './components/HouseOfRiddlez/LivingRoom';
import BackRoom from './components/HouseOfRiddlez/BackRoom';
import Attic from './components/HouseOfRiddlez/Attic';
import RoomOne from './components/HouseOfRiddlez/RoomOne';
import RoomTwo from './components/HouseOfRiddlez/RoomTwo';

import BankGameLevel2 from './components/BankGame/BankGameLevel2';
import BankGameLevel3 from './components/BankGame/BankGameLevel3';
import BankGameStart from './components/BankGame/BankGameStart';
import BankGameVictory from './components/BankGame/BankGameVictory';
import LetterBank from './components/HouseOfRiddlez/LetterBank';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={Homepage} />

        <Route exact path="/haunted/intro" component={HauntedIntro} />
        <Route exact path="/haunted/room1" component={HauntedRoom1} />
        <Route exact path="/haunted/room2" component={HauntedRoom2} />
        <Route exact path="/haunted/room3" component={HauntedRoom3} />
        <Route exact path="/haunted/room2/success" component={Success} />
        <Route exact path="/haunted/room4" component={HauntedRoom4} />
        <Route exact path="/haunted/room5" component={HauntedRoom5} />

        <Route exact path="/houseofriddlez" component={HouseOfRiddlez} />
        <Route exact path="/livingroom" component={LivingRoom} />
        <Route exact path="/room1" component={RoomOne} />
        <Route exact path="/room2" component={RoomTwo} />
        <Route exact path="/backroom" component={BackRoom} />
        <Route exact path="/attic" component={Attic} />
        <Route exact path="/letterbank" component={LetterBank} />

        <Route exact path="/Bankgame" component={BankGameStart} />
        <Route exact path="/Bankgame2" component={BankGameLevel2} />
        <Route exact path="/Bankgame3" component={BankGameLevel3} />
        <Route exact path="/BankgameVictory" component={BankGameVictory} />
        {/* <Redirect to="/" /> */}
      </Router>
    </Provider>
  );
};

export default App;
