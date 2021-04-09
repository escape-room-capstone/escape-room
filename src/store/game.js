import axios from 'axios';

// ** ACTION TYPES **
const SET_GAME = 'SET_GAME';
const SET_CUSTOM_GAME = 'SET_CUSTOM_GAME';
// const CREATE_GAME = 'CREATE_GAME';
// const SET_USER_GAME = 'SET_USER_GAME';

// ** ACTION CREATORS **
const setGame = (game) => ({ type: SET_GAME, game });
const setCustomGame = (game) => ({ type: SET_CUSTOM_GAME, game });
// const setUserGame = (userGame) => ({ type: SET_USER_GAME, userGame });

// ** THUNKS **
// fetch default game (no associated userId)
export const fetchGame = (gameId) => {
  return async (dispatch) => {
    const game = (await axios.get(`/api/games/${gameId}`)).data;
    dispatch(setGame(game));
  };
};
// fetch custom game (with userId)
export const fetchCustomGame = (userId, gameId) => {
  return async (dispatch) => {
    const game = (
      await axios.get(`/api/users/${userId}/games/custom/${gameId}`)
    ).data;
    dispatch(setCustomGame(game));
  };
};
// create custom game using default game structure
export const createGame = (
  userId,
  theme,
  themeId,
  numPuzzles,
  title,
  description,
  puzzleArray,
  timer
) => {
  return async (dispatch) => {
    const game = (
      await axios.post(`/api/users/${userId}/games`, {
        theme,
        themeId,
        numPuzzles,
        title,
        puzzleArray,
        description,
        timer,
      })
    ).data;
    dispatch(setGame(game));
  };
};
// fetch default-style user game
export const fetchUserGame = (userId, gameId) => {
  return async (dispatch) => {
    let userGame = (await axios.get(`/api/users/${userId}/games/${gameId}`, {}))
      .data;
    dispatch(setGame(userGame));
  };
};
// update or rest game timer
export const updateTimer = (gameId, time) => {
  return async (dispatch) => {
    const game = (await axios.put(`/api/games/${gameId}`, { time })).data;
    dispatch(setGame(game));
  };
};

// ** GAME REDUCER **
export const gameReducer = (state = {}, action) => {
  if (action.type === SET_CUSTOM_GAME) {
    return action.game;
  }
  if (action.type === SET_GAME) {
    return action.game;
  }
  return state;
};
