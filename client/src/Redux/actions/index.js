import axios from 'axios'

export const GET_GAMES = 'GET_GAMES'
export const GET_GENRES = 'GET_GENRES'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_SEARCH = 'GET_SEARCH'
export const SET_DETAIL = 'SET_DETAIL'

export const getGames = () => {
    return async function (dispatch) {
        const info = await axios.get('http://localhost:3001/videogames')
        return dispatch({
            type: GET_GAMES,
            payload: info.data
        })
    }
}

export const getSearch = (name) => {
  return async function (dispatch) {
      const info = await axios.get('http://localhost:3001/videogames?name=' +name)
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
      const info = await axios.get('http://localhost:3001/genre')
      return dispatch({
        type: GET_GENRES,
        payload: info.data
      })
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
      const info = await axios.get(`http://localhost:3001/videogames/${id}`)
      return dispatch({
        type: GET_DETAIL,
        payload: info.data
      })
    }
}

export const setDetail = () => {
  return async function (dispatch) {
    return dispatch({
      type: SET_DETAIL,
    })
  }
}

