import React from 'react'
import QuizStore from '../../stores/QuizStore'
import { Redirect } from 'react-router'
import * as QuizActions from '../../actions/QuizActions'

export default class Question extends React.Component {
  constructor () {
    super()
    this.quizLoaded = this.quizLoaded.bind(this)
    this.startGame = this.startGame.bind(this)
    this.sendAnswer = this.sendAnswer.bind(this)
    this.nextPic = this.nextPic.bind(this)
    this.game = null
    this.state = {
      startTime: null,
      timeLeft: null,
      currentImg: null,
      alternatives: ['', '', '', ''],
      endGame: false,
      score: 0,
      question: ''
    }
    this.interval = null
    this.picCount = null
  }
  componentWillMount () {
    QuizStore.on('quiz-loaded', this.quizLoaded)
    QuizStore.on('timeup', this.sendAnswer)
    QuizStore.on('nextpic', this.nextPic)
    QuizStore.on('start-game', this.startGame)
  }
  componentWillUnmount () {
    QuizStore.removeListener('quiz-loaded', this.quizLoaded)
    QuizStore.removeListener('timeup', this.sendAnswer)
    QuizStore.removeListener('nextpic', this.nextPic)
    QuizStore.removeListener('start-game', this.startGame)
  }
  quizLoaded () {
    this.game = QuizStore.getQuizGame()
    setTimeout(() => {
      QuizActions.startGame()
    }, 0)
  }
  startGame () {
    this.startTimer()
    this.picCount = 0
    this.setState({
      currentImg: this.game.questions[this.game.currentCount].urlArr[this.picCount],
      alternatives: this.game.questions[this.game.currentCount].alternatives,
      question: this.game.questions[this.game.currentCount].getQuestionDesc()
    })
  }
  endGame () {
    this.stopTimer()
    setTimeout(() => {
      QuizActions.endGame(this.game.answers, this.state.score)
    }, 0)
    this.setState({endGame: true})
  }
  nextPic () {
    if (this.game.questions[this.game.currentCount].urlArr.length === 1) {

    } else {
      this.picCount++
      this.game.questions[this.game.currentCount].picCount--
      this.setState({
        currentImg: this.game.questions[this.game.currentCount].urlArr[this.picCount],
        question: this.game.questions[this.game.currentCount].getQuestionDesc()
      })
    }
  }
  sendAnswer () {
    this.answer()
    let input = document.querySelectorAll('input')
    for (let i = 0; i < 4; i++) {
      input[i].checked = false
    }
    this.picCount = 0
    this.game.currentCount++
    this.stopTimer()
    if (this.state.score + this.state.timeLeft >= this.game.maxPoints || this.game.currentCount >= this.game.size) {
      this.endGame()
    } else {
      this.startTimer()
      this.setState({
        currentImg: this.game.questions[this.game.currentCount].urlArr[this.picCount],
        alternatives: this.game.questions[this.game.currentCount].alternatives,
        question: this.game.questions[this.game.currentCount].getQuestionDesc()
      })
    }
  }
  startTimer () {
    let game = this.game
    let startTime = game.questions[game.currentCount].time
    this.setState({
      startTime: startTime,
      timeLeft: startTime
    })
    this.interval = setInterval(() => {
      this.setState({timeLeft: this.state.timeLeft - 1})
      if (this.state.timeLeft < 1) {
        QuizActions.timeup()
      } else if (this.state.timeLeft % 10 === 0) {
        QuizActions.nextPic()
      }
    }, 1000)
  }

  stopTimer () {
    window.clearInterval(this.interval)
  }

  answer () {
    let answer = document.querySelector('input[name="answer"]:checked')
    if (answer === null) {
      this.game.answers.push({answer: '', correct: 'Wrong'})
    } else if (answer.value === this.game.questions[this.game.currentCount].rightAnswer) {
      this.setState({score: this.state.score + this.state.timeLeft})
      this.game.answers.push({answer: answer.value, correct: 'Correct'})
    } else {
      this.game.answers.push({answer: answer.value, correct: 'Wrong'})
    }
  }

  render () {
    if (this.state.endGame) {
      return <Redirect to='/end-game' />
    }
    return (
      <div id='quizDiv' className='container'>
        <div className='card transparent card-position borders slideInFromTop'>
          <img id='view' className='card-img-top' alt='' src={this.state.currentImg} />
          <p className='top-right score-board' id='spScore'>Score: {this.state.score}</p>
          <div className='card-body'>
            <h5 className='card-title font-size-16 no-margin'>{this.state.question}</h5>
            <progress className='no-margin' max={this.state.startTime} value={this.state.timeLeft} />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromBottom'>
          <div className='card-body'>
            <div>
              <div>
                <div className='inline'>
                  <input type='radio' id='q1' className='option-input radio inline' name='answer' value={this.state.alternatives[0]} />
                  <label htmlFor='q1' id='l1'>{this.state.alternatives[0]}</label>
                </div>
                <div className='inline'>
                  <input type='radio' id='q2' className='option-input radio inline' name='answer' value={this.state.alternatives[1]} />
                  <label htmlFor='q2' id='l2'>{this.state.alternatives[1]}</label>
                </div>
              </div>
              <div>
                <div className='inline'>
                  <input type='radio' id='q3' className='option-input radio inline' name='answer' value={this.state.alternatives[2]} />
                  <label htmlFor='q3' id='l3'>{this.state.alternatives[2]}</label>
                </div>
                <div className='inline'>
                  <input type='radio' id='q4' className='option-input radio inline' name='answer' value={this.state.alternatives[3]} />
                  <label className='label-custom' htmlFor='q4' id='l4'>{this.state.alternatives[3]}</label>
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
