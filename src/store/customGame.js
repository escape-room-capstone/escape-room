import axios from 'axios';

//action types
const SET_GAME = 'SET_GAME';
// const CREATE_GAME = 'CREATE_GAME';
// const SET_USER_GAME = 'SET_USER_GAME';

//action creators
const setGame = (game) => ({ type: SET_GAME, game });
// const setUserGame = (userGame) => ({ type: SET_USER_GAME, userGame });

//thunk creators

//for fetching a default game - not customized
// export const fetchGame = (gameId) => {
//   return async (dispatch) => {
//     const game = (await axios.get(`/api/games/${gameId}`)).data;
//     dispatch(setGame(game));
//   };
// };

//create a game
export const createCustomGame = (
  userId,
  theme,
  themeId,
  numPuzzles,
  title,
  description,
  puzzleArray,
  timer,
  history
) => {
  return async (dispatch) => {
    const game = (
      await axios.post(`/api/users/${userId}/games/custom`, {
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
    // history.push(`/users/${userId}/account/games`);
    history.push(`/users/${userId}/assignpuzzles/${game.id}`)
  };
};
export const fetchUserGame = (userId, gameId, type) => {
  return async (dispatch) => {
    let userGame = (
      await axios.get(`/api/users/${userId}/games/custom/${gameId}`)
    ).data;
    dispatch(setGame(userGame));
  };
};

//reducer
export const customGameReducer = (state = {}, action) => {
  if (action.type === SET_GAME) {
    return action.game;
  }
  return state;
};
