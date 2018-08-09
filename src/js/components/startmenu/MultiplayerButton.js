import React from 'react'
import { Redirect } from 'react-router'
import firebase from 'firebase'

export default class MultiplayerButton extends React.Component {
  constructor () {
    super()
    this.state = {
      notLoggedIn: '',
      clickedAndLoggedIn: false
    }
    this.playMultiplayer = this.playMultiplayer.bind(this)
  }

  playMultiplayer () {
    if (firebase.auth().currentUser) {
      this.setState({clickedAndLoggedIn: true})
    } else {
      this.setState({notLoggedIn: 'You are not logged in'})
    }
  }

  render () {
    if (this.state.clickedAndLoggedIn) {
      return <Redirect to='/multiplayer-main' />
    }
    return (
      <div id='multiplayerDiv' >
        <button type='submit' id='multiplayerBtn' className='StandardButton btn-block' onClick={this.playMultiplayer} >Multiplayer</button>
        <p>{this.state.notLoggedIn}</p>
      </div>
    )
  }
}
