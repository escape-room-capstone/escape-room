import axios from 'axios';

//action types
const SET_ROOM = 'SET_ROOM';

//action creators
const setRoom = (room) => ({ type: SET_ROOM, room });

//thunk creators
export const fetchRoom = (gameId, roomNum) => {
  return async (dispatch) => {
    //does this endpoint make sense?
    const room = (await axios.get(`/api/games/${gameId}/${roomNum}`)).data;
    dispatch(setRoom(room));
  };
};

//reducer
export const singleRoomReducer = (state = {}, action) => {
  if (action.type === SET_ROOM) {
    return action.room;
  }
  return state;
};
