import { combineReducers }          from 'redux';

import { playlists } from '../modules/playlists'
import { alertMessage } from '../modules/alertMessage'

let rootReducer = combineReducers({
  playlists,
  alertMessage
});

export default rootReducer;
