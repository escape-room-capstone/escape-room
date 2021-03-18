import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './app';
import store from './store/store.js';

import '../public/style.css';
import history from './history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Modal from 'react-modal';

const app = document.querySelector('#app');
Modal.setAppElement(app);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  app
);
