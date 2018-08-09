import React from 'react'
import PlayAgain from '../components/endGame/PlayAgain'
import ScoreBoard from '../components/multiplayerEndGame/Scoreboard'

export default class MultiplayerEndGame extends React.Component {
  render () {
    return (
      <div>
        <PlayAgain />
        <ScoreBoard />
      </div>
    )
  }
}
