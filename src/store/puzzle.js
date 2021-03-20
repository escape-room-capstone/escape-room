import axios from 'axios';

//Action Types //
const SET_PUZZLE = 'SET_PUZZLE';

//ACTION CREATORS //
const _setPuzzle = (puzzle) => ({ type: SET_PUZZLE, puzzle });


//THUNK CREATOR
export const setPuzzle = (id) => {
  return async (dispatch) => {
    const puzzle = (await axios.get(`/api/puzzles/${id}`)).data;
    dispatch(_setPuzzle(puzzle));
  };
};

export const singlePuzzleReducer = (state = [], action) => {
  if (action.type === SET_PUZZLE) {
    return action.puzzle;
  }
  return state;
};

