import axios from 'axios';

//Action Types //
const SET_PUZZLES = 'SET_PUZZLES';
const CREATE_PUZZLE = 'CREATE_PUZZLE';
const DESTROY_PUZZLE = 'DESTROY_PUZZLE';

//ACTION CREATORS //
const _setPuzzles = (puzzles) => ({ type: SET_PUZZLES, puzzles });
const _createPuzzle = (puzzle) => ({ type: CREATE_PUZZLE, puzzle });
const _destroyPuzzle = (id) => ({ type: DESTROY_PUZZLE, id });

//THUNK CREATOR
export const setPuzzles = () => {
  return async (dispatch) => {
    const puzzles = (await axios.get('/api/puzzles')).data;
    dispatch(_setPuzzles(puzzles));
  };
};

export const puzzleReducer = (state = {}, action) => {
  if (action.type === SET_PUZZLES) {
    return action.puzzles;
  }

  return state;
};

// export const puzzleReducer = (state = [], action) => {
//   //would the above state be state = { puzzles: [] } instead???
//   switch (action.type) {
//       case SET_PUZZLES:
//         return {
//           //what do i return here???
//           puzzles: (await axios.get('/api/puzzles')).data
//         }
//       default:
//       return state
//   }
