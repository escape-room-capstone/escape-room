import axios from 'axios';

//action types
const SET_GAME = 'SET_GAME';
const CREATE_GAME = 'CREATE_GAME';
//action creators
const setGame = (game) => ({ type: SET_GAME, game });

//thunk creators
export const fetchGame = (gameId) => {
  return async (dispatch) => {
    const game = (await axios.get(`/api/games/${gameId}`)).data;
    dispatch(setGame(game));
  };
};
export const createGame = (userId, theme) => {
  return async (dispatch) => {
    const game = (await axios.post(`/api/users/${userId}/games`, { theme }))
      .data;
    dispatch(setGame(game));
  };
};
//reducer
export const gameReducer = (state = {}, action) => {
  if (action.type === SET_GAME) {
    return action.game;
  }
  return state;
};
