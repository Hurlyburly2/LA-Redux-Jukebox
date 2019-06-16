import React, { Component } from 'react'
import { connect } from 'react-redux'

import SongTile from '../components/SongTile'

import { getExistingPlaylist } from '../modules/playlists'

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
      return(
        <SongTile
          key={playlistSong.id}
          song={playlistSong.song}
          // below can be left alone until working on Exceeds functionality
          handleClick={() => {}}
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
    getExistingPlaylist: () => dispatch(getExistingPlaylist())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistContainer)
