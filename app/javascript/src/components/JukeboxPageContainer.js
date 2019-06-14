import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeAlertMessage } from '../modules/alertMessage'

import ArtistsIndexContainer from '../containers/ArtistsIndexContainer'
import PlaylistContainer from '../containers/PlaylistContainer'
import SongsIndexContainer from '../containers/SongsIndexContainer'
import AlertMessage from './alertMessage.js'

class JukeboxPageContainer extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let alertMessageDiv
    
    if (this.props.alertMessage) {
      alertMessageDiv = <AlertMessage
        message = {this.props.alertMessage}
        closeAlertMessage = {this.props.closeAlertMessage}
      />
    }
    
    return (  
      <div>
        {alertMessageDiv}
        <div className='row'>
          <ArtistsIndexContainer />
          <SongsIndexContainer />
          <PlaylistContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    alertMessage: state.alertMessage.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeAlertMessage: () => dispatch(closeAlertMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JukeboxPageContainer)
