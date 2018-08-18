import React from 'react'
import ScoreRow from './ScoreRow'

export default class ScoreBoard extends React.Component {
  render () {
    return (
      <div>
        <table>
          <tbody>
            {this.props.answers.map((answer, i) =>
              <ScoreRow key={i + 1} nr={i + 1 + ') '} answer={answer.answer} correct={answer.correct} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
