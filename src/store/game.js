import axios from 'axios';

//action types
const SET_GAME = 'SET_GAME';
const CREATE_GAME = 'CREATE_GAME';
const SET_USER_GAME = 'SET_USER_GAME';

//action creators
const setGame = (game) => ({ type: SET_GAME, game });
const setUserGame = (userGame) => ({ type: SET_USER_GAME, userGame });

//thunk creators

//for fetching a default game - not customized
export const fetchGame = (gameId) => {
  return async (dispatch) => {
    const game = (await axios.get(`/api/games/${gameId}`)).data;
    dispatch(setGame(game));
  };
};

export const createGame = (
  userId,
  theme,
  themeId,
  numPuzzles,
  title,
  description,
  puzzleArray,
  type
) => {
  return async (dispatch) => {
    console.log(theme, title, description, 'theme title description');
    const game = (
      await axios.post(`/api/users/${userId}/games`, {
        theme,
        themeId,
        numPuzzles,
        title,
        puzzleArray,
        type,
        description,
      })
    ).data;
    dispatch(setGame(game));
  };
};
//make different axios call depending on whether a game is a default or custom (from scratch) type
export const fetchUserGame = (userId, gameId, type) => {
  return async (dispatch) => {
    let userGame;
    if (type === 'custom') {
      userGame = (
        await axios.get(`/api/users/${userId}/games/custom/${gameId}`)
      ).data;
    } else {
      userGame = (await axios.get(`/api/users/${userId}/games/${gameId}`, {}))
        .data;
    }
    dispatch(setUserGame(userGame));
  };
};

//reducer
export const gameReducer = (state = {}, action) => {
  if (action.type === SET_USER_GAME) {
    return action.userGame;
  }
  if (action.type === SET_GAME) {
    return action.game;
  }
  return state;
};
