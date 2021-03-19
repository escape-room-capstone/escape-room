import axios from 'axios';

//Action Types //
const SET_USERS = 'SET_USERS';

//ACTION CREATORS //
const setUsers = (users) => ({ type: SET_USERS, users });

//THUNK CREATOR
export const fetchUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(setUsers(users));
  };
};


export const userReducer = (state = [], action) => {
  if (action.type === SET_USERS) {
    return action.users;
  }
  return state;
};
