import React, { Component } from 'react'
import { connect } from 'react-redux'

import SongTile from '../components/SongTile'

import { addSongToPlaylistPost } from '../modules/playlists'

class SongsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const songTiles = this.props.artistSongs.map(song => {
      const addSong = () => {
        this.props.addSongToPlaylistPost(song.id)
      }
      return(
        <SongTile
          key={song.id}
          song={song}
          handleClick={addSong}
          type='add'
        />
      )
    })

    return(
      <div className='columns small-10 medium-4'>
        <h1>Available Songs</h1>
        {songTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artistSongs: state.songs.artistSongs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSongToPlaylistPost: (songId) => dispatch(addSongToPlaylistPost(songId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsIndexContainer)
