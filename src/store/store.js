import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { puzzleReducer } from '../store/puzzles';
import { composeWithDevTools } from 'redux-devtools-extension';
import { singleUserReducer, userReducer } from '../store/users';
import { gameReducer } from './game';
import { customGameReducer } from './customGame';
import { allGamesReducer } from './allGames';
import { themesReducer } from './theme';
import { themeReducer } from './singleTheme';
import { singlePuzzleReducer } from './puzzle';
import auth from './auth';
import { singleRoomReducer } from './singeleRoom';
import gameUtilsReducer from './gameUtils';

const initialState = {};

// const middleware = [thunk, createLogger({ collapse: true })];
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const rootReducer = combineReducers({
  puzzles: puzzleReducer,
  puzzle: singlePuzzleReducer,
  users: userReducer,
  user: singleUserReducer,
  game: gameReducer,
  themes: themesReducer,
  theme: themeReducer,
  allGames: allGamesReducer,
  room: singleRoomReducer,
  customGame: customGameReducer,
  gameUtils: gameUtilsReducer,

  auth,
});

const store = createStore(rootReducer, initialState, middleware);

export default store;
