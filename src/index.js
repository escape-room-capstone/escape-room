import React from 'react';
import { render } from 'react-dom';
import App from './app';
import store from './store';
import Modal from 'react-modal';

const app = document.querySelector('#app');
Modal.setAppElement(app);

render(<App />, app);
