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
  console.log('making axios callign to get puzzles');
  return async (dispatch) => {
    const puzzles = (await axios.get('/api/puzzles')).data;
    console.log(puzzles, 'puzzles');
    dispatch(_setPuzzles(puzzles));
  };
};

export const puzzleReducer = (state = [], action) => {
  if (action.type === SET_PUZZLES) {
    return action.puzzles;
  }
  return state;
};
