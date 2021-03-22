// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import dynamicGame from './DynamicGame';

// 'Root reducer'; add any imported reducers into combineReducers
const rootReducer = combineReducers({
    dynamicGame
});


const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

// Create store
const store = createStore(rootReducer, middleware);

// Exports
export default store;