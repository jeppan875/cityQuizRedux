import React from 'react'
import QuizStore from '../../stores/QuizStore'
import * as firebase from 'firebase'
import PlayerList from './PlayerList'
import { Redirect } from 'react-router'
const database = firebase.database()

export default class JoinRoom extends React.Component {
  constructor () {
    super()
    this.clickReady = this.clickReady.bind(this)
    this.quizLoaded = this.quizLoaded.bind(this)
    this.state = {
      classNames: 'StandardButton',
      disabled: false,
      gameId: null,
      startGame: false,
      renderQuiz: false
    }
  }
  componentWillMount () {
    QuizStore.on('multiplayer-quiz-loaded', this.quizLoaded)
  }
  componentWillUnmount () {
    QuizStore.removeListener('multiplayer-quiz-loaded', this.quizLoaded)
    let readyCountRef = database.ref(`games/${this.state.gameId}/readyCount`)
    let gameRef = database.ref(`games/${this.state.gameId}`)
    let playerCount = database.ref(`games/${this.state.gameId}/playerCount`)
    if (this.state.startGame === false) {
      readyCountRef.once('value', function (snapshot) {
        let update = parseInt(snapshot.val(), 10) - 1
        if (update <= 0) {
          update = 0
        }
        gameRef.update({readyCount: update})
      })
      playerCount.once('value', function (snapshot) {
        let update = parseInt(snapshot.val(), 10) - 1
        if (update <= 0) {
          update = 0
        }
        gameRef.update({playerCount: update})
      })
    }
    readyCountRef.off('value')
  }
  quizLoaded () {
    this.setState({gameId: QuizStore.getGameId()})
    this.onReady()
  }
  onReady () {
    let readyCountRef = database.ref(`games/${this.state.gameId}/readyCount`)
    let gameRef = database.ref(`games/${this.state.gameId}`)
    readyCountRef.on('value', function (snapshot) {
      let update = parseInt(snapshot.val(), 10) - 1
      if (update <= 0) {
        update = 0
      }
      gameRef.onDisconnect().update({readyCount: update})
      gameRef.once('value').then(function (gameSnapshot) {
        let maxPlayers = gameSnapshot.child('maxPlayers').val()
        if (parseInt(snapshot.val(), 10) === parseInt(maxPlayers, 10)) {
          this.setState({startGame: true})
          setTimeout(() => {
            this.setState({renderQuiz: true})
          }, 0)
        }
      }.bind(this))
    }.bind(this))
  }

  clickReady (e) {
    e.preventDefault()
    this.setState({
      classNames: 'StandardButton pressedButton',
      disabled: true
    })
    let readyCount = database.ref(`games/${this.state.gameId}/readyCount`)
    readyCount.transaction(function (readyCount) {
      return (readyCount || 0) + 1
    })
  }
  render () {
    if (this.state.renderQuiz) {
      return <Redirect to='/multiplayer-quiz' />
    } else {
      return (
        <div id='joinroom'>
          <p className='no-margin'>Game key:</p>
          <p id='key'>{this.state.gameId}</p>
          <p>Game link:</p>
          <p>
            {window.location.hostname}:{window.location.port}/join?{this.state.gameId}
          </p>
          <p>Player list:</p>
          <div id='playerlist'>
            <PlayerList startGame={this.state.startGame} />
          </div>
          <div id='start'>
            <button type='submit' id='startBtn' className={this.state.classNames} onClick={this.clickReady} disabled={this.state.disabled} >Start game</button>
            <p id='wait' />
          </div>
        </div>
      )
    }
  }
}
