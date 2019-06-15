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
    case START_NEW_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false
      }
    case GET_ARTISTS_REQUEST_SUCCESS:
      const newArtists = state.artists.concat(action.artists)
      return {
        ...state,
        isFetching: false,
        artists: newArtists
      }
    case GET_ARTIST_SONGS_REQUEST_SUCCESS:
      const newSongs = action.artistSongs
      const newArtistId = action.selectedArtistId
      return {
        ...state,
        artistSongs: newSongs,
        selectedArtistId: newArtistId
      }
    default:
      return state
  }
}

const START_NEW_REQUEST = 'START_NEW_REQUEST'
const startNewRequest = () => {
  return {
    type: START_NEW_REQUEST
  }
}

const REQUEST_FAILED = 'REQUEST_FAILED'
const requestFailed = () => {
  return {
    type: REQUEST_FAILED
  }
}

const GET_ARTISTS_REQUEST_SUCCESS = 'GET_ARTISTS_REQUEST_SUCCESS'
const getArtistsRequestSuccess = artists => {
  return {
    type: GET_ARTISTS_REQUEST_SUCCESS,
    artists
  }
}

const getArtists = () => {
  return (dispatch) => {
    dispatch(startNewRequest())
    
    return fetch('/api/v1/artists.json')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          dispatch(requestFailed())
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

const GET_ARTIST_SONGS_REQUEST_SUCCESS = 'GET_ARTIST_SONGS_REQUEST_SUCCESS'
const getArtistSongsRequestSuccess = (artistId, artistSongs) => {
  return {
    type: GET_ARTIST_SONGS_REQUEST_SUCCESS,
    selectedArtistId: artistId,
    artistSongs
  }
}

const getArtistSongs = (artistId) => {
  return (dispatch) => {
    dispatch(startNewRequest())
    
    return fetch(`/api/v1/artists/${artistId}/songs`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          dispatch(requestFailed())
          dispatch(displayAlertMessage("Something went wrong."))
          return { error: 'Something went wrong' }
        }
      })
      .then(artistSongs => {
        if (!artistSongs.error) {
          dispatch(getArtistSongsRequestSuccess(artistId, artistSongs))
        }
      })
  }
}

export {
  playlists,
  getArtists,
  getArtistSongs
}
