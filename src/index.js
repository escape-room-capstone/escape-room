import React from 'react';
import { render } from 'react-dom';
import App from './app';
import store from './store'

const app = document.querySelector('#app');

render(<App />, app);
