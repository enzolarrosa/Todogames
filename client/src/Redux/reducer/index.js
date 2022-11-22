
import { GET_DETAIL, GET_GAMES, GET_GENRES, GET_SEARCH, SET_DETAIL } from "../actions"

const initialState = {
    games: [],
    allGames : [],
    genres: [],
    gamesDetail: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_GAMES : 
        return {
            ...state,
            allGames: action.payload,
            games: action.payload
        }
        case GET_GENRES :
        return {
            ...state,
            genres: action.payload 
        }
        case GET_DETAIL :
            return {
                ...state,
                gamesDetail: action.payload
            }
        case GET_SEARCH: 
            return {
                ...state,
                games: action.payload
            }
        case SET_DETAIL : 
            return {
                ...state,
                gamesDetail: []
            }
        default: return state
    }
}

export default rootReducer