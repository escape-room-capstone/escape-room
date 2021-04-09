import axios from 'axios';

// Initial State
const initialState = {
  gameTimer: {
    countdown: {
      min: 0,
      sec: 0,
    },
    initTimer: {
      min: 0,
      sec: 0,
    },
  },
};

// Constants
export const SET_TIMER = 'SET_TIMER';
export const SET_COUNTDOWN = 'SET_COUNTDOWN';
export const SAVE_COUNTDOWN = 'SAVE_COUNTDOWN';
export const CLEAR_COUNTDOWN = 'CLEAR_COUNTDOWN';

// Action Creators
export const _setTimer = (min, sec) => ({ type: SET_TIMER, min, sec });
export const _setCountdown = (min, sec) => ({ type: SET_COUNTDOWN, min, sec });
export const _saveCountdown = (min, sec) => ({
  type: SAVE_COUNTDOWN,
  min,
  sec,
});
export const _clearCountdown = () => ({ type: CLEAR_COUNTDOWN });

// ** Thunks **// Set initial timer
export const setTimer = (min, sec) => {
  return async (dispatch) => {
    dispatch(_setTimer(min, sec));
  };
};

// Update active countdown
export const setCountdown = (min, sec) => {
  return async (dispatch) => {
    dispatch(_setCountdown(min, sec));
  };
};

// ** Reducer **
export default function gameUtilsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        gameTimer: {
          ...state.gameTimer,
          initTimer: {
            ...state.gameTimer.initTimer,
            min: action.min,
            sec: action.sec,
          },
        },
      };
    case SET_COUNTDOWN:
      return {
        ...state,
        gameTimer: {
          ...state.gameTimer,
          countdown: {
            ...state.gameTimer.countdown,
            min: action.min,
            sec: action.sec,
          },
        },
      };
    case CLEAR_COUNTDOWN:
      return {};
    default:
      return state;
  }
}
