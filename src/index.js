import React from 'react';
import { render } from 'react-dom';
import App from './app';
import store from './store';
import Modal from 'react-modal';

import "../public/style.css"
import history from './history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Modal from "react-modal";

const app = document.querySelector('#app');
Modal.setAppElement(app);



render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    app
  )