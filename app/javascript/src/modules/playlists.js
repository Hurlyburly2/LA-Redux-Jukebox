import { displayAlertMessage } from './alertMessage.js'

const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  playlistSongs: [],
  isFetching: false
}

const playlists = (state = initialState, action) => {
  switch(action.type) {
    case GET_ARTISTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case GET_ARTISTS_REQUEST_SUCCESS:
      const newArtists = state.artists.concat(action.artists)
      return {
        ...state,
        isFetching: false,
        artists: newArtists
      }
    default:
      return state
  }
}

const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST'
const getArtistsRequest = () => {
  return {
    type: GET_ARTISTS_REQUEST
  }
}

const GET_ARTISTS_REQUEST_SUCCESS = 'GET_ARTISTS_REQUEST_SUCCESS'
const getArtistsRequestSuccess = artists => {
  return {
    type: GET_ARTISTS_REQUEST_SUCCESS,
    artists
  }
}

const GET_ARTISTS_REQUEST_FAILURE = 'GET_ARTISTS_REQUEST_FAILURE'
const getArtistsRequestFailure = () => {
  return {
    type: GET_ARTISTS_REQUEST_FAILURE
  }
}

const getArtists = () => {
  return (dispatch) => {
    dispatch(getArtistsRequest())
    
    return fetch('/api/v1/artists.json')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          dispatch(getArtistsRequestFailure())
          dispatch(displayAlertMessage("Something went wrong."))
          return { error: 'Something went wrong' }
        }
      })
      .then(artists => {
        if (!artists.error) {
          dispatch(getArtistsRequestSuccess(artists))
        }
      })
  }
}

export {
  playlists,
  getArtists
}
