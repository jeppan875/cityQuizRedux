import React from 'react'
import ScoreRow from './ScoreRow'
import QuizStore from '../../stores/QuizStore'

export default class ScoreBoard extends React.Component {
  constructor () {
    super()
    this.getAnswers = this.getAnswers.bind(this)
    this.state = {
      answers: []
    }
  }
  componentWillMount () {
    QuizStore.on('end-game', this.getAnswers)
  }
  componentWillUnmount () {
    QuizStore.removeListener('end-game', this.getAnswers)
  }
  getAnswers () {
    this.setState({answers: QuizStore.getAnswers()})
  }
  render () {
    return (
      <div>
        <table>
          <tbody>
            {this.state.answers.map((answer, i) =>
              <ScoreRow key={i + 1} nr={i + 1 + ') '} answer={answer.answer} correct={answer.correct} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
