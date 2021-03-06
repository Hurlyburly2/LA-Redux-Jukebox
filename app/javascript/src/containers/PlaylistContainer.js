import React, { Component } from 'react'
import { connect } from 'react-redux'

import SongTile from '../components/SongTile'

import { getExistingPlaylist, removeSongFromPlaylist } from '../modules/playlists'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    this.props.getExistingPlaylist()
  }

  render() {
    const playlistSongs = this.props.playlistSongs

    const songTiles = playlistSongs.map(playlistSong => {
      const removeSong = () => {
        this.props.removeSongFromPlaylist(playlistSong.id)
      }
      
      return(
        <SongTile
          key={playlistSong.id}
          song={playlistSong.song}
          handleClick={removeSong}
          type="delete"
        />
      )
    })

    return(
      <div className='columns small-10 medium-4'>
        <h1>Current Playlist</h1>
        {songTiles}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playlistSongs: state.playlists.playlistSongs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExistingPlaylist: () => dispatch(getExistingPlaylist()),
    removeSongFromPlaylist: (songId) => dispatch(removeSongFromPlaylist(songId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistContainer)
