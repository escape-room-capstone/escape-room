import axios from 'axios';

//action types
const SET_ALL_GAMES = 'SET_ALL_GAMES';

//action creators
const setAllGames = (games) => ({ type: SET_ALL_GAMES, games });

//thunk creators
export const fetchGames = () => {
  return async (dispatch) => {
    const games = (await axios.get(`/api/games`)).data;
    dispatch(setAllGames(games));
  };
};

//reducer
export const allGamesReducer = (state = [], action) => {
  if (action.type === SET_ALL_GAMES) {
    return action.games;
  }
  return state;
};
