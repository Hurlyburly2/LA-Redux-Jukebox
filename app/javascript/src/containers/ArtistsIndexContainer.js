import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getArtists, getArtistSongs } from '../modules/songs'

import ArtistTile from '../components/ArtistTile'

class ArtistsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  
  componentDidMount() {
    this.props.getArtists()
  }
  
  handleSelect(event) {
    this.props.getArtistSongs(event.target.id)
  }
  
  render() {
    const artistTiles = this.props.artists.map(artist => {
      return(
        <ArtistTile
          key={artist.id}
          id={artist.id}
          artist={artist}
          handleSelect={this.handleSelect}
        />
      )
    })

    return (
      <div className='columns small-10 medium-4'>
        <h1>Artists</h1>
        {artistTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artists: state.songs.artists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArtists: () => dispatch(getArtists()),
    getArtistSongs: (artistId) => dispatch(getArtistSongs(artistId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsIndexContainer)
