
import { GET_DETAIL, GET_GAMES, GET_GENRES, GET_SEARCH, SET_DETAIL ,FILTER_GENRE, ORDER_GAME, POST_DOG} from "../actions"

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
        case FILTER_GENRE :
            const g = state.allGames.filter( e => e.genres.find(e => e.name.toLowerCase() === action.payload))
            return {
                ...state,
                games: g
            }
        case ORDER_GAME :
            const order= action.payload === 'A - Z'? state.games.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
                if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                return 0
            }) : action.payload === 'Z - A'? state.games.sort ((a,b) => {
                if(a.name.toLowerCase() < b.name.toLowerCase()) { return 1}
                if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                return 0
            }) : action.payload === 'Rating -'? state.games.sort((a,b) => {
                if (a.rating < b.rating) {return -1}
                if (a.rating > b.rating) {return 1}
                return 0
            }) : action.payload === 'Rating +'? state.games.sort ((a,b) => {
                if(a.rating < b.rating) { return 1}
                if (a.rating > b.rating) {return -1}
                return 0
            }) : state.games
            console.log(order[0].name)
            return {
                ...state,
                games : order
            }
        case POST_DOG:
            return{
            ...state
        }
        default: return state
    }
}

export default rootReducer