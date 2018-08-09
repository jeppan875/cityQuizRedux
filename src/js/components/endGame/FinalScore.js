import React from 'react'
import QuizStore from '../../stores/QuizStore'

export default class FinalScore extends React.Component {
  constructor () {
    super()
    this.getScore = this.getScore.bind(this)
    this.state = {
      score: 0
    }
  }
  componentWillMount () {
    QuizStore.on('end-game', this.getScore)
  }
  componentWillUnmount () {
    QuizStore.removeListener('end-game', this.getScore)
  }
  getScore () {
    this.setState({score: QuizStore.getScore()})
  }
  render () {
    return (
      <div>
        <p className='no-margin'>Your score: {this.state.score}</p>
      </div>
    )
  }
}
