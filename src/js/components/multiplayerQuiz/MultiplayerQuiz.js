import React from 'react'
import QuizStore from '../../stores/QuizStore'
import { Redirect } from 'react-router'
import * as QuizActions from '../../actions/QuizActions'
import MultiplayerScoreRow from './MultiplayerScoreRow'
import * as firebase from 'firebase'
const database = firebase.database()

export default class MultiplayerQuiz extends React.Component {
  constructor () {
    super()
    this.user = firebase.auth().currentUser
    this.playerCount = 0
    this.state = {
      classNames: 'StandardButton',
      disabled: false,
      startTime: null,
      timeLeft: null,
      currentImg: null,
      alternatives: ['', '', '', ''],
      endGame: false,
      score: 0,
      question: '',
      scores: []
    }
    this.setNextQuestion = this.setNextQuestion.bind(this)
    this.nextPic = this.nextPic.bind(this)
    this.game = QuizStore.getQuizGame()
    this.gameId = QuizStore.getGameId()
    this.gameEnded = false
    this.scores = []
    this.interval = null
    this.picCount = null
    setTimeout(() => {
      this.startGame()
    }, 0)
  }
  componentWillMount () {
    QuizStore.on('nextpic', this.nextPic)
    QuizStore.on('next-question', this.setNextQuestion)
  }
  componentWillUnmount () {
    QuizStore.removeListener('nextpic', this.nextPic)
    QuizStore.removeListener('next-question', this.setNextQuestion)
    let gameRef = database.ref(`games/${this.gameId}`)
    let playersRef = database.ref(`games/${this.gameId}/players`)
    let nextCountRef = database.ref(`games/${this.gameId}/nextCount`)
    let playerCount = database.ref(`games/${this.gameId}/playerCount`)
    let maxPlayersRef = database.ref(`games/${this.gameId}/maxPlayers`)
    playersRef.off('value')
    nextCountRef.off('value')
    playerCount.off('value')
    maxPlayersRef.off('value')
    gameRef.off('value')
    // If player leaves by pressing back button
    if (!this.gameEnded) {
      playersRef.child(firebase.auth().currentUser.uid).remove()
      maxPlayersRef.once('value', function (snapshot) {
        let update = parseInt(snapshot.val(), 10) - 1
        gameRef.update({maxPlayers: update})
      })
      playerCount.once('value', function (snapshot) {
        let update = parseInt(snapshot.val(), 10) - 1
        gameRef.update({playerCount: update})
      })
      if (this.state.disabled) {
        // if disconnects and have pressed sent answer button
        nextCountRef.once('value', function (snapshot) {
          if (this.state.disabled) {
            // if disconnects and have pressed sent answer button
            let update = parseInt(snapshot.val(), 10) - 1
            gameRef.onDisconnect().update({nextCount: update})
          }
        })
      }
    }
  }
  watchGame () {
    let gameRef = database.ref(`games/${this.gameId}`)
    let playersRef = database.ref(`games/${this.gameId}/players`)
    let nextCountRef = database.ref(`games/${this.gameId}/nextCount`)
    let playerCount = database.ref(`games/${this.gameId}/playerCount`)
    let maxPlayersRef = database.ref(`games/${this.gameId}/maxPlayers`)
    maxPlayersRef.on('value', function (snapshot) {
      let update = parseInt(snapshot.val(), 10) - 1
      gameRef.onDisconnect().update({maxPlayers: update})
    })
    gameRef.child('state').on('value', function (snapshot) {
      let state = snapshot.val()
      if (state === 'finished') {
        this.gameEnded = true
        this.endGame()
      }
    }.bind(this))
    nextCountRef.on('value', function (snapshot) {
      if (this.state.disabled) {
        // if disconnects and have pressed sent answer button
        let update = parseInt(snapshot.val(), 10) - 1
        gameRef.onDisconnect().update({nextCount: update})
      }
      if (this.gameEnded === true) return
      let nextCount = parseInt(snapshot.val(), 10)
      gameRef.once('value').then(function (gameSnapshot) {
        let maxPlayers = gameSnapshot.child('maxPlayers').val()
        this.playerCount = maxPlayers
        if (nextCount % parseInt(maxPlayers, 10) === 0 && nextCount !== 0) {
          QuizActions.multiplayerNextQuestion()
        }
      }.bind(this))
    }.bind(this))

    playersRef.on('value', function (snapshot) {
      playersRef.child(firebase.auth().currentUser.uid).onDisconnect().remove()
      if (this.gameEnded === true) return
      let players = Object.keys(snapshot.val())
      let pArr = []
      for (let i = 0; i < players.length; i++) {
        let player = snapshot.child(`${players[i]}`).val().displayName
        let score = parseInt(snapshot.child(`${players[i]}`).val().score, 10)
        pArr[i] = {player: player, score: score}
        if (score >= this.game.maxPoints) {
          gameRef.update({state: 'finished'})
        }
      }
      pArr = pArr.sort((a, b) => {
        return a.score - b.score
      })
      pArr = pArr.reverse()
      this.scores = pArr
      this.setState({scores: pArr})
    }.bind(this))

    playerCount.on('value', function (snapshot) {
      let update = parseInt(snapshot.val(), 10) - 1
      gameRef.onDisconnect().update({playerCount: update})
    })
  }
  startGame () {
    this.startTimer()
    this.picCount = 0
    this.setState({
      currentImg: this.game.questions[this.game.currentCount].urlArr[this.picCount],
      alternatives: this.game.questions[this.game.currentCount].alternatives,
      question: this.game.questions[this.game.currentCount].getQuestionDesc()
    })
    this.watchGame()
  }
  endGame () {
    this.stopTimer()
    this.gameEnded = true
    setTimeout(() => {
      QuizActions.multiplayerScores(this.scores)
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
  answerSent () {
    if (this.gameEnded === true) return
    this.setState({
      classNames: 'StandardButton pressedButton',
      disabled: true
    })
    let answer = document.querySelector('input[name="answer"]:checked')
    let gameRef = database.ref(`games/${this.gameId}`)
    let nextCount = gameRef.child('nextCount')
    gameRef.once('value', function (gameSnapshot) {
      let playerRef = database.ref(`games/${this.gameId}/players/${this.user.uid}`)
      if (this.isAnswerCorrect(this.game.questions[this.game.currentCount].rightAnswer, answer)) {
        let newScore = parseInt(gameSnapshot.child(`players/${this.user.uid}/score`).val(), 10) + this.state.timeLeft
        playerRef.update({score: newScore})
      }
      if (this.gameEnded === true) return
      nextCount.transaction(function (nextCount) {
        return (nextCount || 0) + 1
      })
    }.bind(this))
  }
  isAnswerCorrect (rightAnswer, answer) {
    if (answer === null) {
      return false
    } else if (answer.value === rightAnswer) {
      return true
    } else {
      return false
    }
  }
  setNextQuestion () {
    this.setState({
      classNames: 'StandardButton',
      disabled: false
    })
    let input = document.querySelectorAll('input')
    for (let i = 0; i < 4; i++) {
      input[i].checked = false
    }
    this.picCount = 0
    this.game.currentCount++
    this.stopTimer()
    if (this.game.currentCount >= this.game.size) {
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
      if (this.state.timeLeft < 0) {
        this.setState({timeLeft: 0})
      }
      if (this.state.timeLeft === 1) {
        if (this.state.disabled) return
        this.answerSent()
      } else if (this.state.timeLeft % 10 === 0) {
        QuizActions.nextPic()
      }
    }, 1000)
  }

  stopTimer () {
    window.clearInterval(this.interval)
  }

  render () {
    if (this.state.endGame) {
      return <Redirect to='/multiplayer-endgame' />
    }
    return (
      <div id='quizDiv' className='container'>
        <div className='card transparent card-position borders slideInFromTop'>
          <img id='view' className='card-img-top' alt='' src={this.state.currentImg} />
          <div id='scoreBoard' className='top-right score-board'>
            <table>
              <tbody>
                {this.state.scores.map((playerScore, i) =>
                  <MultiplayerScoreRow key={i + 1} player={playerScore.player} score={playerScore.score} />
                )}
              </tbody>
            </table>
          </div>
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
                  <input type='radio' id='q1' className='option-input radio inline' name='answer' disabled={this.state.disabled} value={this.state.alternatives[0]} />
                  <label htmlFor='q1' id='l1'>{this.state.alternatives[0]}</label>
                </div>
                <div className='inline'>
                  <input type='radio' id='q2' className='option-input radio inline' name='answer' disabled={this.state.disabled} value={this.state.alternatives[1]} />
                  <label htmlFor='q2' id='l2'>{this.state.alternatives[1]}</label>
                </div>
              </div>
              <div>
                <div className='inline'>
                  <input type='radio' id='q3' className='option-input radio inline' name='answer' disabled={this.state.disabled} value={this.state.alternatives[2]} />
                  <label htmlFor='q3' id='l3'>{this.state.alternatives[2]}</label>
                </div>
                <div className='inline'>
                  <input type='radio' id='q4' className='option-input radio inline' name='answer' disabled={this.state.disabled} value={this.state.alternatives[3]} />
                  <label className='label-custom' htmlFor='q4' id='l4'>{this.state.alternatives[3]}</label>
                </div>
              </div>
            </div>
            <div id='btn'>
              <button type='submit' id='send' className={this.state.classNames} disabled={this.state.disabled} onClick={this.answerSent.bind(this)}>send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
