import React from 'react'
import JoinRoom from '../components/multiplayerJoinRoom/JoinRoom'

export default class MultiplayerJoinRoom extends React.Component {
  constructor () {
    super()
    window.history.replaceState(null, null, '/multiplayer-main')
  }
  render () {
    return (
      <div>
        <JoinRoom />
      </div>
    )
  }
}
