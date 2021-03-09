import { Router, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={Homepage} />
        {/* <Homepage /> */}
        <Route exact path="/haunted/intro" component={HauntedIntro} />
        <Route exact path="/haunted/room1" component={HauntedRoom1} />
        <Route exact path="/haunted/room2" component={HauntedRoom2} />
        <Route exact path="/haunted/room3" component={HauntedRoom3} />
        <Route exact path="/haunted/room2/success" component={Success} />
      </Router>
    </Provider>
  );
};

export default App;
