import BobaFett from './components/SteveGame/BobaFett';
import { Router, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage';
import history from './history';

//Haunted theme game
import { HauntedRoom1 } from './components/Haunted/HauntedRoom1';
import { HauntedRoom2 } from './components/Haunted/HauntedRoom2';
import { HauntedRoom3 } from './components/Haunted/HauntedRoom3';
import { HauntedRoom4 } from './components/Haunted/HauntedRoom4';
import { HauntedRoom5 } from './components/Haunted/HauntedRoom5';
import { HauntedIntro } from './components/Haunted/HauntedIntro';
import { HauntedR2Success } from './components/Haunted/HauntedR2Success';
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
import { CreateTheme } from './components/CreateTheme';
import Account from './components/Account';
import UpdateProfile from './components/UpdateProfile';

import Home from './components/riddlez/Home';
import Home1 from './components/riddlez/Home1';
import Home2 from './components/riddlez/Home2';
import Home3 from './components/riddlez/Home3';
import Home4 from './components/riddlez/Home4';
import Home5 from './components/riddlez/Home5';
import LetterBank from './components/riddlez/LetterBank';

import BankGameLevel2 from './components/BankGame/BankGameLevel2';
import BankGameLevel3 from './components/BankGame/BankGameLevel3';
import BankGameStart from './components/BankGame/BankGameStart';
import BankGameVictory from './components/BankGame/BankGameVictory';

import ChooseTheme from './components/CreateGame/ChooseTheme';
import CreateAGame from './components/CreateGame/CreateGame';
import AssignPuzzles from './components/CreateGame/AssignPuzzles';
import ConfirmTheme from './components/CreateGame/ConfirmTheme';
import SinglePuzzle from './components/CreateGame/SinglePuzzle';
import SingleRoom from './components/DynamicGameSrc/SingleRoom';
// import GameIntro from './components/CreateGame/GameIntro';

import { Landing } from './components/Landing';
import EditSingleRoom from './components/CreateGame/EditSingleRoom';

// victory and fail components
import { VictoryPage } from './components/VictoryPage';
import { FailPage } from './components/FailPage';

//About page
import { About } from './components/About';

const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/users/:id/account" component={Account} />
      <Route
        exact
        path="/users/:id/account/updateprofile"
        component={UpdateProfile}
      />
      <Route exact path="/starwars/4" component={BobaFett} />
      <Route exact path="/haunted/:gameId" component={HauntedIntro} />
      <Route exact path="/haunted/:gameId/room1" component={HauntedRoom1} />
      <Route exact path="/haunted/:gameId/room2" component={HauntedRoom2} />
      <Route exact path="/haunted/:gameId/room3" component={HauntedRoom3} />
      <Route
        exact
        path="/haunted/:gameId/room2/success"
        component={HauntedR2Success}
      />
      <Route exact path="/haunted/:gameId/room4" component={HauntedRoom4} />
      <Route exact path="/haunted/:gameId/room5" component={HauntedRoom5} />
      <Route exact path="/haunted/:gameId/room6" component={HauntedRoom6} />
      <Route exact path="/haunted/:gameId/room7" component={HauntedRoom7} />
      <Route exact path="/haunted/:gameId/room8" component={HauntedRoom8} />
      <Route exact path="/haunted/:gameId/room9" component={HauntedRoom9} />
      <Route exact path="/haunted/:gameId/final" component={HauntedFinal} />
      <Route
        exact
        path="/users/:userId/assignpuzzles/:gameId"
        component={AssignPuzzles}
      />
      <Route exact path="/users/:userId/account/games" component={UserGames} />
      <Route exact path="/users/:userId/createTheme" component={CreateTheme} />
      <Route exact path="/riddlez/:gameId" component={LetterBank} />
      <Route exact path="/riddlez/home" component={Home} />
      <Route exact path="/riddlez/home1" component={Home1} />
      <Route exact path="/riddlez/home2" component={Home2} />
      <Route exact path="/riddlez/home3" component={Home3} />
      <Route exact path="/riddlez/home4" component={Home4} />
      <Route exact path="/riddlez/home5" component={Home5} />
      <Route exact path="/Bank/3" component={BankGameStart} />
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
      {/* custome game route */}
      <Route exact path="/games/:gameId/:roomId/:idx" component={CustomGame} />
      {/* victory and fail routes */}
      <Route exact path="/games/:gameId/victory" component={VictoryPage} />
      <Route exact path="/games/:gameId/fail" component={FailPage} />
      {/* about page */}
      <Route exact path="/about" component={About} />{' '}
      {/* <Redirect to="/" /> */}
    </Router>
  );
};

export default App;
