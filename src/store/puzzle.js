import axios from 'axios';

//Action Types //
const SET_PUZZLE = 'SET_PUZZLE';
const UPDATE_PUZZLE = 'UPDATE_PUZZLE';

//ACTION CREATORS //
const _setPuzzle = (puzzle) => ({ type: SET_PUZZLE, puzzle });
const _updatePuzzle = (puzzle) => ({ type: UPDATE_PUZZLE, puzzle });

//THUNK CREATOR
export const setPuzzle = (id) => {
  return async (dispatch) => {
    const puzzle = (await axios.get(`/api/puzzles/${id}`)).data;
    dispatch(_setPuzzle(puzzle));
  };
};

//use the gameId to be able to update a nonlinear dynamic game
export const updatePuzzle = (gameId, id, isSolved, history) => {
  return async (dispatch) => {
    const puzzle = (await axios.put(`/api/puzzles/${id}`, { isSolved })).data;
    dispatch(_updatePuzzle(puzzle));
    history.push(`/HouseofRiddlez/${gameId}`);
  };
};

export const singlePuzzleReducer = (state = [], action) => {
  if (action.type === SET_PUZZLE) {
    return action.puzzle;
  }
  if (action.type === UPDATE_PUZZLE) {
    return action.puzzle;
  }
  return state;
};
