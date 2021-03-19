import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import rootReducer from '../reducers';
import { puzzleReducer } from './puzzles';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './users';
import { gameReducer } from './game';
import { themesReducer } from './theme'
import { themeReducer } from './singleTheme';
import { singlePuzzleReducer } from './puzzle';
// import dynamicGame from './dynamicGameStore';
const initialState = {};

// const middleware = [thunk, createLogger({ collapse: true })];
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const rootReducer = combineReducers({
  puzzles: puzzleReducer,
  puzzle: singlePuzzleReducer,
  users: userReducer,
  game: gameReducer,
  themes: themesReducer,
  theme: themeReducer  

  // dynamicGame,

  // themes: themeReducer
});

const store = createStore(rootReducer, initialState, middleware);

export default store;
