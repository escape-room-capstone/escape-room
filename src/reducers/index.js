import { combineReducers } from 'redux';
import { gameReducer } from './game.js';

const rootReducer = combineReducers({ game: gameReducer });
// this is the "root reducer"; add any imported reducers into combineReducers
export default rootReducer;
