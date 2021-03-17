import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

import { puzzleReducer } from './puzzles';
import { userReducer } from './users';

const reducer = combineReducers({
  puzzles: puzzleReducer,
  users: userReducer,
  // themes: themeReducer
});

// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
// );

const store = createStore(reducer, applyMiddleware);

export default store;
