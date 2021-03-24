// Imports
import axios from 'axios';

// Initial State
const initialState = {
    activeGame: {}
}

// Constants
export const GET_GAME = 'GET_GAME'

// Action Creators
export const _getActiveGame = (dg) => ({ type: GET_GAME, dg });


// ** Thunks **
// Fetch active game
export const getActiveGame = (id) => {
    return async (dispatch) => {
        const dg = (await axios.get(`/api/dg/${id}`)).data
        dispatch(_getActiveGame(dg))
    }
}

// ** Reducer **
export default function dynamicGame(state = initialState, action) {
    switch (action.type) {
        // Fetch active game and it's components
        case GET_GAME:
            return {
                ...state,
                activeGame: action.game
            }
        default:
            return state
    }
}