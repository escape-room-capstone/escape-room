import { combineReducers } from 'redux';
import { gameReducer } from './game.js';
import { puzzleReducer } from './puzzles.js';
import { userReducer } from './users.js';

const rootReducer = combineReducers({
  game: gameReducer,
  puzzle: puzzleReducer,
  user: userReducer,
});
// this is the "root reducer"; add any imported reducers into combineReducers
export default rootReducer;
