import { Router, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage';
import store from './store';
import history from './history';
import { HauntedRoom1 } from './components/HauntedRoom1';
import { HauntedRoom2 } from './components/HauntedRoom2';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={Homepage} />
        {/* <Homepage /> */}
        <Route exact path="/haunted/room1" component={HauntedRoom1} />
        <Route exact path="/haunted/room2" component={HauntedRoom2} />
      </Router>
    </Provider>
  );
};

export default App;
