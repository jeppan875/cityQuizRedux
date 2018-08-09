import React from 'react'
import ScoreRow from './ScoreRow'
import QuizStore from '../../stores/QuizStore'

export default class ScoreBoard extends React.Component {
  constructor () {
    super()
    this.setScores = this.setScores.bind(this)
    this.state = {
      scores: []
    }
  }
  componentWillMount () {
    QuizStore.on('multiplayer-scores', this.setScores)
  }
  componentWillUnmount () {
    QuizStore.removeListener('multiplayer-scores', this.setScores)
  }
  setScores () {
    this.setState({scores: QuizStore.getMultiplayerScores()})
  }
  render () {
    return (
      <div>
        <table>
          <tbody>
            {this.state.scores.map((playerScore, i) =>
              <ScoreRow key={i} nr={i + 1} player={playerScore.player} score={playerScore.score} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
