import axios from 'axios';

//action types
const GET_THEMES = 'GET_THEMES';

//action creators
const getThemes = (themes) => ({ type: GET_THEMES, themes });

//thunk creators
export const fetchThemes = () => {
  return async (dispatch) => {
    const themes = (await axios.get(`/api/themes`)).data;
    dispatch(getThemes(themes));
  };
};


//reducer
export const themesReducer = (state = [], action) => {
  if (action.type === GET_THEMES) {
    return action.themes;
  }
  return state;
};
