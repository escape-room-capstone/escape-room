import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_ROOMS = 'LOAD_ROOMS';
const LOAD_PUZZLES = 'LOAD_PUZZLES';
const SET_VIEW = 'SET_MODAL_DISPLAY';
const CREATE_USER = 'CREATE_PUZZLE';
