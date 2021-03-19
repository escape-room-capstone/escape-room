import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import rootReducer from '../reducers';
import { puzzleReducer } from '../reducers/puzzles';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from '../reducers/users';
import { gameReducer } from './game';
import { allGamesReducer } from '../reducers/allGames';
// import dynamicGame from './dynamicGameStore';
const initialState = {};

// const middleware = [thunk, createLogger({ collapse: true })];
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const rootReducer = combineReducers({
  puzzles: puzzleReducer,
  users: userReducer,
  game: gameReducer,
  allGames: allGamesReducer,
  // dynamicGame,

  // themes: themeReducer
});

const store = createStore(rootReducer, initialState, middleware);

export default store;
