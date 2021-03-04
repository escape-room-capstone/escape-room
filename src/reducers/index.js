import { combineReducers } from "redux";
import roomReducer from './roomReducer'

const rootReducer = combineReducers({roomReducer});
// this is the "root reducer"; add any imported reducers into combineReducers
export default rootReducer;