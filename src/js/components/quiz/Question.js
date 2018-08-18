import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import store from '../../store'
import { incCurrentCount, updateScore, addAnswer, decTime, incPicCount, resetQuestion, renderEndGame, resetGame } from '../../actions/gameAction'

class Question extends React.Component {
  constructor () {
    super()
    this.startGame = this.startGame.bind(this)
    this.sendAnswer = this.sendAnswer.bind(this)
    this.nextPic = this.nextPic.bind(this)
    console.log(store.getState())
  }
  componentDidMount () {
    this.startGame()
  }
  componentWillUnmount () {
    this.props.resetGame()
  }
  startGame () {
    this.startTimer()
    this.picCount = 0
  }
  endGame () {
    this.stopTimer()
    this.props.renderEndGame()
  }
  nextPic () {
    if (this.props.questionArr[this.props.currentCount].urlArr.length === 1) {

    } else {
      this.props.incPicCount()
    }
  }
  sendAnswer () {
    this.answer()
    let input = document.querySelectorAll('input')
    for (let i = 0; i < 4; i++) {
      input[i].checked = false
    }
    this.stopTimer()
    if (this.props.score + this.props.timeLeft >= this.props.maxPoints || this.props.currentCount + 1 >= this.props.size) {
      this.endGame()
    } else {
      this.props.incCurrentCount()
      this.props.resetQuestion(this.props.questionArr[this.props.currentCount].time)
      this.startTimer()
    }
  }
  startTimer () {
    console.log(store.getState())
    this.interval = setInterval(() => {
      this.props.decTime()
      if (this.props.timeLeft < 1) {
        this.sendAnswer()
      } else if (this.props.timeLeft % 10 === 0) {
        this.nextPic()
      }
    }, 1000)
  }

  stopTimer () {
    window.clearInterval(this.interval)
  }

  answer () {
    let answer = document.querySelector('input[name="answer"]:checked')
    if (answer === null) {
      this.props.addAnswer({answer: '', correct: 'Wrong'})
    } else if (answer.value === this.props.questionArr[this.props.currentCount].rightAnswer) {
      this.props.updateScore(20)
      this.props.addAnswer({answer: answer.value, correct: 'Correct'})
    } else {
      this.props.addAnswer({answer: answer.value, correct: 'Wrong'})
    }
    console.log(store.getState())
  }

  render () {
    if (this.props.gameEnded) {
      return <Redirect to='/end-game' />
    }
    return (
      <div id='quizDiv' className='container'>
        <div className='card transparent card-position borders slideInFromTop'>
          <img id='view' className='card-img-top' alt='' src={this.props.questionArr[this.props.currentCount].urlArr[this.props.picCount]} />
          <p className='top-right score-board' id='spScore'>Score: {this.props.score}</p>
          <div className='card-body'>
            <h5 className='card-title font-size-16 no-margin'>{this.props.questionArr[this.props.currentCount].getQuestionDesc(this.props.picCount)}</h5>
            <progress className='no-margin' max={this.props.questionArr[this.props.currentCount].time} value={this.props.timeLeft} />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromBottom'>
          <div className='card-body'>
            <div>
              <div>
                <div className='inline'>
                  <input type='radio' id='q1' className='option-input radio inline' name='answer' value={this.props.questionArr[this.props.currentCount].alternatives[0]} />
                  <label htmlFor='q1' id='l1'>{this.props.questionArr[this.props.currentCount].alternatives[0]}</label>
                </div>
                <div className='inline'>
                  <input type='radio' id='q2' className='option-input radio inline' name='answer' value={this.props.questionArr[this.props.currentCount].alternatives[1]} />
                  <label htmlFor='q2' id='l2'>{this.props.questionArr[this.props.currentCount].alternatives[1]}</label>
                </div>
              </div>
              <div>
                <div className='inline'>
                  <input type='radio' id='q3' className='option-input radio inline' name='answer' value={this.props.questionArr[this.props.currentCount].alternatives[2]} />
                  <label htmlFor='q3' id='l3'>{this.props.questionArr[this.props.currentCount].alternatives[2]}</label>
                </div>
                <div className='inline'>
                  <input type='radio' id='q4' className='option-input radio inline' name='answer' value={this.props.questionArr[this.props.currentCount].alternatives[3]} />
                  <label className='label-custom' htmlFor='q4' id='l4'>{this.props.questionArr[this.props.currentCount].alternatives[3]}</label>
                </div>
              </div>
            </div>
            <div id='btn'>
              <button type='submit' id='send' className='StandardButton btn-block' onClick={this.sendAnswer.bind(this)}>send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questionArr: state.game.game.questions,
  currentCount: state.game.currentCount,
  score: state.game.score,
  maxPoints: state.game.maxPoints,
  size: state.game.game.size,
  timeLeft: state.game.timeLeft,
  picCount: state.game.picCount,
  gameEnded: state.game.gameEnded
})

export default connect(mapStateToProps, {incCurrentCount, updateScore, addAnswer, decTime, incPicCount, resetQuestion, renderEndGame, resetGame})(Question)
