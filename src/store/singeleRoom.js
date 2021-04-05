import axios from 'axios';

//action types
const SET_ROOM = 'SET_ROOM';
const GET_ROOM = 'GET_ROOM'

//action creators
const setRoom = (room) => ({ type: SET_ROOM, room });
const getRoom = (room) => ({ type: GET_ROOM, room });

//thunk creators
// export const fetchRoom = (gameId, roomNum) => {
//   return async (dispatch) => {
//     //does this endpoint make sense?
//     const room = (await axios.get(`/api/games/${gameId}/${roomNum}`)).data;
//     console.log(room, 'room');
//     dispatch(setRoom(room));
//   };
// };
export const fetchRoom = (gameId, roomId) => {
  return async (dispatch) => {
    const room = (await axios.get(`/api/games/${gameId}/${roomId}`)).data;
    dispatch(setRoom(room));
  };
};

//I realized we can just get the room by its unique ID like Roman mentioned, but didn't want to interfere with code that was using ^ thunk above
export const fetchSingleRoom = (roomId) => {
  return async (dispatch) => {    
    const room = (await axios.get(`/api/rooms/${roomId}`)).data;        
    dispatch(getRoom(room));
  };
};

//reducer
export const singleRoomReducer = (state = {}, action) => {
  if(action.type === GET_ROOM) {
    return action.room
  }
  if (action.type === SET_ROOM) {
    return action.room;
  }  
  return state;
};
