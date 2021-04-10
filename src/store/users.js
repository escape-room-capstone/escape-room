import axios from 'axios';

//Action Types //
const SET_USERS = 'SET_USERS';
const SET_USER = 'SET_USER';
const UPDATE_PROFILE = 'UPDATE_PROFILE';

//ACTION CREATORS //
const setUsers = (users) => ({ type: SET_USERS, users });
const _setUser = (user) => ({ type: SET_USER, user });
const _updateProfile = (user) => ({ type: UPDATE_PROFILE, user });

//THUNK CREATOR
export const fetchUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(setUsers(users));
  };
};

export const setUser = (id) => {
  // console.log(' i am working??');
  return async (dispatch) => {
    const user = (await axios.get(`/api/users/${id}`)).data;
    dispatch(_setUser(user));
  };
};

export const updateProfile = (
  id,
  firstName,
  lastName,
  phoneNumber,
  birthdate,
  email,
  history
) => {
  return async (dispatch) => {
    console.log("MY ID", id);
    const user = (
      await axios.put(`/api/users/${id}`, {
        firstName,
        lastName,
        phoneNumber,
        birthdate,
        email,
      })
    ).data;
    dispatch(_updateProfile(user));    
  };
};

export const userReducer = (state = [], action) => {
  if (action.type === SET_USERS) {
    return action.users;
  }
  // if (action.type === SET_USERS) {
  //   return action.user;
  // }
  // if (action.type === UPDATE_PROFILE) {
  //   return action.user;
  // }
  return state;
};

export const singleUserReducer = (state = [], action) => {
  if (action.type === SET_USER) {
    return action.user;
  }
  if (action.type === UPDATE_PROFILE) {
    return action.user;
  }
  return state;
};
