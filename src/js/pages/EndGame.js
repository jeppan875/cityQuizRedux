import React from 'react'
import PlayAgain from '../components/endGame/PlayAgain'
import ScoreBoard from '../components/endGame/ScoreBoard'
import FinalScore from '../components/endGame/FinalScore'

export default class EndGame extends React.Component {
  render () {
    return (
      <div>
        <div className='card transparent card-position borders slideInFromTop'>
          <div className='card-body'>
            <FinalScore />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromLeft'>
          <div className='card-body'>
            <ScoreBoard />
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
