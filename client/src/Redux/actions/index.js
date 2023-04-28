import axios from 'axios'

export const GET_GAMES = 'GET_GAMES'
export const GET_GENRES = 'GET_GENRES'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_SEARCH = 'GET_SEARCH'
export const SET_DETAIL = 'SET_DETAIL'
export const FILTER_GENRE = 'FILTER_GENRE'
export const ORDER_GAME = 'ORDER_GAME'
export const POST_DOG= 'POST_DOG'

export const getGames = () => {
    return async function (dispatch) {
        const info = await axios.get('/videogames')
        return dispatch({
            type: GET_GAMES,
            payload: info.data
        })
    }
}

export const getSearch = (name) => {
  return async function (dispatch) {
      const info = await axios.get('/videogames?name=' +name)
      if(info.data == 'not') {
        return dispatch({
          type: GET_SEARCH,
          payload: ['not']
      })
      } else {
        return dispatch({
            type: GET_SEARCH,
            payload: info.data
        })
      }
  }
}

export const getGenres = () => {
    return async function (dispatch) {
      const info = await axios.get('/genre')
      return dispatch({
        type: GET_GENRES,
        payload: info.data
      })
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
      const info = await axios.get(`/videogames/${id}`)
      return dispatch({
        type: GET_DETAIL,
        payload: info.data
      })
    }
}

export const filterGenre = (payload) => {
  return {
    type: FILTER_GENRE,
    payload,
  }
}

export const orderGame = (payload) => {
  return {
    type: ORDER_GAME,
    payload,
  }
}

export const postGame = (payload) => { 
  return async function () {
      const info = await axios.post('/videogames', payload)
      return info
  }
}

export const setDetail = () => {
  return async function (dispatch) {
    return dispatch({
      type: SET_DETAIL,
    })
  }
}

