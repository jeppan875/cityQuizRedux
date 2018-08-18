import React from 'react'
import PlayAgain from '../components/endGame/PlayAgain'
import ScoreBoard from '../components/endGame/ScoreBoard'
import FinalScore from '../components/endGame/FinalScore'
import { connect } from 'react-redux'

class EndGame extends React.Component {
  render () {
    return (
      <div>
        <div className='card transparent card-position borders slideInFromTop'>
          <div className='card-body'>
            <FinalScore score={this.props.score} />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromLeft'>
          <div className='card-body'>
            <ScoreBoard answers={this.props.answers} />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromBottom'>
          <div className='card-body'>
            <PlayAgain />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  score: state.game.score,
  answers: state.game.answers
})

export default connect(mapStateToProps, {})(EndGame)
