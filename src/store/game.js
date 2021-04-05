import axios from 'axios';

//action types
const SET_GAME = 'SET_GAME';
const SET_CUSTOM_GAME = 'SET_CUSTOM_GAME'
// const CREATE_GAME = 'CREATE_GAME';
// const SET_USER_GAME = 'SET_USER_GAME';

//action creators
const setGame = (game) => ({ type: SET_GAME, game });
const setCustomGame = (game) => ({ type : SET_CUSTOM_GAME, game })
// const setUserGame = (userGame) => ({ type: SET_USER_GAME, userGame });

//thunk creators

//for fetching a default game with no associated userId
export const fetchGame = (gameId) => {
  return async (dispatch) => {
    console.log("GETTING GAME");
    const game = (await axios.get(`/api/games/${gameId}`)).data;
    dispatch(setGame(game));
  };
};

export const fetchCustomGame = (userId, gameId) => {
  return async (dispatch) => {
  const game = (await axios.get(`/api/users/${userId}/games/custom/${gameId}`)).data;
  dispatch(setCustomGame(game));
    };
};

//customize game in style of default game - haunted, bank, riddles, etc
export const createGame = (
  userId,
  theme,
  themeId,
  numPuzzles,
  title,
  description,
  puzzleArray
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
      })
    ).data;
    dispatch(setGame(game));
  };
};

//fetch default-style user game
export const fetchUserGame = (userId, gameId) => {
  return async (dispatch) => {
    let userGame = (await axios.get(`/api/users/${userId}/games/${gameId}`, {}))
      .data;
    dispatch(setGame(userGame));
  };
};

//reducer
export const gameReducer = (state = {}, action) => {
  if (action.type === SET_CUSTOM_GAME) {
    return action.game
  }
  if (action.type === SET_GAME) {
    return action.game;
  }
  return state;
};
