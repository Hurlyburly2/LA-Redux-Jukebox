import { displayAlertMessage } from './alertMessage.js'

const initialState = {
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
    case ADD_SONG_TO_PLAYLIST_SUCCESS:
      const newPlaylistSongs = state.playlistSongs.concat(action.newPlaylistSong)
      return {
        ...state,
        playlistSongs: newPlaylistSongs,
        isFetching: false
      }
    case GET_EXISTING_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlistSongs: action.newPlaylistSongs,
        isFetching: false
      }
    case REMOVE_SONG_FROM_PLAYLIST_SUCCESS:
      const songRemovedFromPlaylist = state.playlistSongs.filter ( song => song.id !== action.songId )
      return {
        ...state,
        playlistSongs: songRemovedFromPlaylist,
        isFetching: false
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

const ADD_SONG_TO_PLAYLIST_SUCCESS = 'ADD_SONG_TO_PLAYLIST'
const addSongToPlaylistSuccess = (newPlaylistSong) => {
  return {
    type: ADD_SONG_TO_PLAYLIST_SUCCESS,
    newPlaylistSong
  }
}

const addSongToPlaylistPost = (songId) => {
  return (dispatch) => {
    dispatch(startNewRequest())
    
    return fetch(`/api/v1/songs/${songId}/playlist_songs`,
      {
        method: 'POST',
        body: JSON.stringify(songId),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        dispatch(requestFailed())
        dispatch(displayAlertMessage("Something went wrong."))
        return { error: 'Something went wrong' }
      }
    })
    .then(newPlaylistSong => {
      if (!newPlaylistSong.error) {
        dispatch(addSongToPlaylistSuccess(newPlaylistSong))
      }
    })
  }
}

const GET_EXISTING_PLAYLIST_SUCCESS = 'GET_EXISTING_PLAYLIST_SUCCESS'
const getExistingPlaylistSuccess = (newPlaylistSongs) => {
  return {
    type: GET_EXISTING_PLAYLIST_SUCCESS,
    newPlaylistSongs
  }
}

const getExistingPlaylist = () => {
  return (dispatch) => {
    dispatch(startNewRequest())
    
    return fetch('/api/v1/playlist_songs')
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          dispatch(requestFailed())
          dispatch(displayAlertMessage("Something went wrong."))
        }
      })
      .then(newPlaylistSongs => {
        if (!newPlaylistSongs.error) {
          dispatch(getExistingPlaylistSuccess(newPlaylistSongs))
        }
      })
  }
}

const REMOVE_SONG_FROM_PLAYLIST_SUCCESS = 'REMOVE_SONG_FROM_PLAYLIST_SUCCESS'
const removeSongFromPlaylistSuccess = (songId) => {
  return {
    type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS,
    songId
  }
}

const removeSongFromPlaylist = (songId) => {
  return (dispatch) => {
    dispatch(startNewRequest())
    
    return fetch(`/api/v1/playlist_songs/${songId}`,
      {
        method: 'DELETE',
        body: JSON.stringify(songId),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if (response.ok) {
        dispatch(removeSongFromPlaylistSuccess(songId))
      } else {
        dispatch(requestFailed())
        dispatch(displayAlertMessage("Something went wrong."))
        return { error: 'Something went wrong.' }
      }
    })
  }
}

export {
  playlists,
  addSongToPlaylistPost,
  getExistingPlaylist,
  removeSongFromPlaylist
}
