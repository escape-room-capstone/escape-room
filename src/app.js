import BobaFett from './components/SteveGame/BobaFett';
import { Router, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage';
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
import { HauntedRoom8 } from './components/Haunted/HauntedRoom8';
import { HauntedRoom9 } from './components/Haunted/HauntedRoom9';
import { HauntedFinal } from './components/Haunted/HauntedFinal';
// import { CreateGame } from './components/CreateGame';
import { CustomGame } from './components/CustomGame';
import { UserGames } from './components/UserGames';
import { Login } from './components/AuthForm';
import { Signup } from './components/AuthForm';

import HouseOfRiddlez from './components/riddlez/HouseOfRiddlez';
import LivingRoom from './components/riddlez/LivingRoom';
import BackRoom from './components/riddlez/BackRoom';
import Attic from './components/riddlez/Attic';
import RoomOne from './components/riddlez/RoomOne';
import RoomTwo from './components/riddlez/RoomTwo';

import BankGameLevel2 from './components/BankGame/BankGameLevel2';
import BankGameLevel3 from './components/BankGame/BankGameLevel3';
import BankGameStart from './components/BankGame/BankGameStart';
import BankGameVictory from './components/BankGame/BankGameVictory';
import LetterBank from './components/riddlez/LetterBank';
import ChooseTheme from './components/CreateGame/ChooseTheme';
import CreateAGame from './components/CreateGame/CreateGame';
import AssignPuzzles from './components/CreateGame/AssignPuzzles';
import ConfirmTheme from './components/CreateGame/ConfirmTheme';
import SinglePuzzle from './components/CreateGame/SinglePuzzle';
import SingleRoom from './components/DynamicGameSrc/SingleRoom';
// import GameIntro from './components/CreateGame/GameIntro';

import { Landing } from './components/Landing';
import EditSingleRoom from './components/CreateGame/EditSingleRoom';

const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/starwars/4" component={BobaFett} />
      <Route exact path="/haunted/:gameId/1" component={HauntedIntro} />
      <Route exact path="/haunted/room1" component={HauntedRoom1} />
      <Route exact path="/haunted/room2" component={HauntedRoom2} />
      <Route exact path="/haunted/room3" component={HauntedRoom3} />
      <Route exact path="/haunted/room2/success" component={Success} />
      <Route exact path="/haunted/room4" component={HauntedRoom4} />
      <Route exact path="/haunted/room5" component={HauntedRoom5} />
      <Route exact path="/haunted/room6" component={HauntedRoom6} />
      <Route exact path="/haunted/room7" component={HauntedRoom7} />
      <Route exact path="/haunted/room8" component={HauntedRoom8} />
      <Route exact path="/haunted/room9" component={HauntedRoom9} />
      <Route exact path="/haunted/final" component={HauntedFinal} />

      {/* <Route exact path="/customize" component={CreateGame} /> */}
      <Route
        exact
        path="/users/:userId/assignpuzzles/:gameId"
        component={AssignPuzzles}
      />
      <Route exact path="/users/:userId/account/games" component={UserGames} />

      <Route exact path="/riddlez/:gameId" component={LetterBank} />
      <Route exact path="/riddlez/mainroom" component={HouseOfRiddlez} />
      <Route exact path="/riddlez/livingroom" component={LivingRoom} />
      <Route exact path="/riddlez/roomone" component={RoomOne} />
      <Route exact path="/riddlez/roomtwo" component={RoomTwo} />
      <Route exact path="/riddlez/backroom" component={BackRoom} />
      <Route exact path="/riddlez/attic" component={Attic} />

      <Route exact path="/BankRobbery/3" component={BankGameStart} />
      <Route exact path="/Bankgame2" component={BankGameLevel2} />
      <Route exact path="/Bankgame3" component={BankGameLevel3} />
      <Route exact path="/BankgameVictory" component={BankGameVictory} />
      <Route exact path="/choosetheme" component={ChooseTheme} />
      <Route exact path="/theme/:id" component={ConfirmTheme} />
      <Route exact path="/creategame/:id" component={CreateAGame} />
      <Route exact path="/puzzle/:id" component={SinglePuzzle} />
      <Route exact path="/editsingleroom/:id" component={EditSingleRoom} /> 

      <Route exact path="/dg" component={SingleRoom} />
      {/* <Route exact path="/gameintro/:id" component={GameIntro} /> */}

      <Route
        exact
        path="/games/customize/:gameId/:roomId"
        component={CustomGame}
      />

      {/* <Redirect to="/" /> */}
    </Router>
  );
};

export default App;
