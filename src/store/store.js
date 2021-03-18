import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import rootReducer from '../reducers';
import { puzzleReducer } from './puzzles';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './users';
import { gameReducer } from './game';
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
  // dynamicGame,

  // themes: themeReducer
});

const store = createStore(rootReducer, initialState, middleware);

export default store;