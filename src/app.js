import React from "react";
import { Provider } from "react-redux";
import BobaFett from "./components/SteveGame/BobaFett";
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <BobaFett/>
    </Provider>
  );
};

export default App;
