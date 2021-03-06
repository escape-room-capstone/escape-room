import { Router } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import Homepage from "./components/Homepage";
import store from './store'
import history from "./history";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
      <Homepage />
      </Router>
    </Provider>
  );
};

export default App;
