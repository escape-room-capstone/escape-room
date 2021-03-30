import axios from 'axios';

//action types
const SINGLE_THEME = 'SINGLE_THEME';

//action creators
const singleTheme = (theme) => ({ type: SINGLE_THEME, theme });

//thunk creators
export const fetchTheme = (id) => {
    return async (dispatch) => {        
        const theme = (await axios.get(`/api/themes/${id}`)).data;        
        dispatch(singleTheme(theme));
    }
}

//reducer
export const themeReducer = (state = {}, action) => {
  if (action.type === SINGLE_THEME) {
      return action.theme
  }
  return state;
};