import axios from 'axios';

//action types
const SET_GAME = 'SET_GAME';
const CREATE_GAME = 'CREATE_GAME';
const SET_USER_GAME = 'SET_USER_GAME';

//action creators
const setGame = (game) => ({ type: SET_GAME, game });
const setUserGame = (userGame) => ({ type: SET_USER_GAME, userGame });

//thunk creators
export const fetchGame = (gameId) => {
  return async (dispatch) => {
    const game = (await axios.get(`/api/games/${gameId}`)).data;
    dispatch(setGame(game));
  };
};

export const createGame = (userId, theme, numPuzzles, title) => {
  return async (dispatch) => {
    const game = (
      await axios.post(`/api/users/${userId}/games`, {
        theme,
        numPuzzles,
        title,
      })
    ).data;
    dispatch(setGame(game));
  };
};

export const fetchUserGame = (userId, gameId) => {
  return async (dispatch) => {
    const userGame = (await axios.get(`/api/users/${userId}/games/${gameId}`))
    dispatch(setUserGame(userGame));
  }
}

//reducer
export const gameReducer = (state = {}, action) => {
  if(action.type === SET_USER_GAME) {
    return action.userGame
  }
  if (action.type === SET_GAME) {
    return action.game;
  }
  return state;
};
