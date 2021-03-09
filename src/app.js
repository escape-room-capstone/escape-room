import { Router } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import Homepage from "./components/Homepage";
import store from './store'
import history from "./history";
import Routes from "./routes";

const App = () => {
  return (
      <Routes />
  );
};

export default App;
