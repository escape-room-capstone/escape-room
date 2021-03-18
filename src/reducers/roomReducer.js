import GET_ROOM from '../actions/actions';

const initialState = {
  puzzles: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM:
      return {
        ...state,
        puzzles: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
