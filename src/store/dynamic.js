// Imports
import axios from 'axios';

// Initial State
const initialState = {
  activeGame: {},
  activeRoom: {},
};

// Constants
export const GET_GAME = 'GET_GAME';
export const GET_ROOM = 'GET_ROOM';

// Action Creators
export const _getActiveGame = (activeGame) => ({ type: GET_GAME, activeGame });
export const _getActiveRoom = (activeRoom) => ({ type: GET_ROOM, activeRoom });

// ** Thunks **
// Fetch active game
export const getActiveGame = (gameId) => {
  return async (dispatch) => {
    const selectedGame = (await axios.get(`/api/dg/game${gameId}`)).data;
    dispatch(_getActiveGame(selectedGame));
  };
};

// Fetch active room
export const getActiveRoom = (gameId, roomId) => {
  return async (dispatch) => {
    const selectedRoom = (
      await axios.get(`/api/dg/game${gameId}/room${roomId}`)
    ).data;
    dispatch(_getActiveRoom(selectedRoom));
  };
};

// ** Reducer **
export default function dynamicGame(state = initialState, action) {
  switch (action.type) {
    // Fetch active game and it's components
    case GET_GAME:
      return {
        ...state,
        activeGame: action.activeGame,
      };
    case GET_ROOM:
      return {
        ...state,
        activeRoom: action.activeRoom,
      };
    default:
      return state;
  }
}
