import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import Question from '../components/quiz/Question'
import Progress from '../components/quiz/Progress'
import QuizForm from '../components/quiz/QuizForm'
import { incCurrentCount, updateScore, addAnswer, decTime, incPicCount, resetQuestion, renderEndGame } from '../actions/gameAction'

class Quiz extends React.Component {
  constructor () {
    super()
    this.startGame = this.startGame.bind(this)
    this.sendAnswer = this.sendAnswer.bind(this)
    this.nextPic = this.nextPic.bind(this)
    window.history.replaceState(null, null, '/')
  }
  componentDidMount () {
    this.startGame()
  }
  startGame () {
    this.props.resetQuestion(this.props.questionArr[this.props.currentCount].time)
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
  sendAnswer (e) {
    e.preventDefault()
    this.answer()
    let input = document.querySelectorAll('input')
    for (let i = 0; i < 4; i++) {
      input[i].checked = false
    }
    this.stopTimer()
    if (this.props.currentCount + 1 >= this.props.size) {
      this.endGame()
    } else {
      this.props.incCurrentCount()
      this.props.resetQuestion(this.props.questionArr[this.props.currentCount + 1].time)
      this.startTimer()
    }
  }
  startTimer () {
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
      this.props.updateScore(this.props.timeLeft)
      this.props.addAnswer({answer: answer.value, correct: 'Correct'})
      if (this.props.score + this.props.timeLeft >= this.props.maxPoints) {
        this.endGame()
      }
    } else {
      this.props.addAnswer({answer: answer.value, correct: 'Wrong'})
    }
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
            <Question question={this.props.questionArr[this.props.currentCount].getQuestionDesc(this.props.picCount)} />
            <Progress maxtime={this.props.questionArr[this.props.currentCount].time} timeleft={this.props.timeLeft} />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromBottom'>
          <div className='card-body'>
            <form onSubmit={this.sendAnswer.bind(this)} >
              <QuizForm alternatives={this.props.questionArr[this.props.currentCount].alternatives} />
            </form>
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
  maxPoints: state.game.game.maxPoints,
  size: state.game.game.size,
  timeLeft: state.game.timeLeft,
  picCount: state.game.picCount,
  gameEnded: state.game.gameEnded
})

export default connect(mapStateToProps, { incCurrentCount, updateScore, addAnswer, decTime, incPicCount, resetQuestion, renderEndGame })(Quiz)
