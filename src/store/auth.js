import axios from 'axios';

const storage = () => window.localStorage;
const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const getUserByToken = () => async (dispatch) => {
  const token = storage().getItem(TOKEN);
  if (token) {
    //send the token with returns the user in our DB associated with the JWT token in localStorage
    const user = (
      await axios.get('api/auth/user', {
        headers: {
          authorization: token,
        },
      })
    ).data;
    dispatch(setAuth(user));
  }
};

export const authenticate = (
  firstName,
  lastName,
  email,
  password,
  method,
  history
) => async (dispatch) => {
  try {
    // send user credentials to api to check credentials and then receive a JWT token
    const res = (
      await axios.post(`/api/auth/${method}`, {
        firstName,
        lastName,
        email,
        password,
      })
    ).data;
    storage().setItem(TOKEN, res.token);
    dispatch(getUserByToken());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  // storage().removeItem(TOKEN);
  storage().clear();
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
