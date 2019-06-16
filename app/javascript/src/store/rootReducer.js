import { combineReducers }          from 'redux';

import { playlists } from '../modules/playlists'
import { songs } from '../modules/songs'
import { alertMessage } from '../modules/alertMessage'

let rootReducer = combineReducers({
  playlists,
  songs,
  alertMessage
});

export default rootReducer;
