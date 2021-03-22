// Imports
import axios from 'axios';

// Initial State
const initialState = {
    activeGame: {}
}

// Constants
export const GET_GAME = 'GET_GAME'

// Action Creators
export const _getActiveGame = (game) => ({ type: GET_GAME, game });


// ** Thunks **
// Fetch active game
export const getActiveGame = (id) => {
    return async (dispatch) => {
        const game = (await axios.get(`/api/dg/${id}`)).data
        dispatch(_getActiveGame(game))
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