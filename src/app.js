import { Router, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage';
import store from './store';
import history from './history';
import { HauntedRoom1 } from './components/HauntedRoom1';
import { HauntedRoom2 } from './components/HauntedRoom2';
import { HauntedRoom3 } from './components/HauntedRoom3';
import { Success } from './components/HauntedR2Success';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={Homepage} />
        {/* <Homepage /> */}
        <Route exact path="/haunted/room1" component={HauntedRoom1} />
        <Route exact path="/haunted/room2" component={HauntedRoom2} />
        <Route exact path="/haunted/room3" component={HauntedRoom3} />
        <Route exact path="/haunted/room2/success" component={Success} />
      </Router>
      <HauntedRoom3 />
    </Provider>
  );
};

export default App;
