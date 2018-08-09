import React from 'react'
import { Redirect } from 'react-router'
import QuizStore from '../../stores/QuizStore'
import QuizGame from '../../game/QuizGame'
import * as QuizActions from '../../actions/QuizActions'
import * as firebase from 'firebase'
const database = firebase.database()

export default class LoadingMultiplayerGame extends React.Component {
  constructor () {
    super()
    let gameIdFromUrl = null
    if (window.location.search) {
      gameIdFromUrl = window.location.search.substring(1)
    }
    this.imgLoaded = this.imgLoaded.bind(this)
    this.downloadQuiz = this.downloadQuiz.bind(this)
    this.state = {
      imgLoadCount: 0,
      startGame: false,
      gameId: gameIdFromUrl || QuizStore.getGameId(),
      gamefull: false
    }
    this.imgLoadCount = 0
    this.quizGame = null
    this.maxImg = null
    setTimeout(() => {
      this.downloadQuiz()
    }, 2000)
  }
  componentWillMount () {
    QuizStore.on('img-loaded', this.imgLoaded)
  }
  componentWillUnmount () {
    QuizStore.removeListener('img-loaded', this.imgLoaded)
  }
  downloadQuiz () {
    let user = firebase.auth().currentUser
    let playerCount = database.ref(`games/${this.state.gameId}/playerCount`)
    let players = database.ref(`games/${this.state.gameId}/players`)
    database.ref(`games/${this.state.gameId}/`).once('value').then(function (gameSnapshot) {
      let game = gameSnapshot.child('game/questions').val()
      playerCount.transaction(function (currentData) {
        return (currentData || 0) + 1
      }, function (error, committed, snapshot) {
        if (error) {
          console.log(error)
        } else if (committed) {
          let maxPlayers = parseInt(gameSnapshot.child('maxPlayers').val(), 10)
          let maxPoints = parseInt(gameSnapshot.child('game/maxPoints').val(), 10)
          this.maxImg = parseInt(gameSnapshot.child('game/size').val(), 10)
          if (parseInt(snapshot.val(), 10) <= maxPlayers) {
            let updates = {}
            updates[`/${user.uid}`] = {
              displayName: user.email,
              uid: user.uid,
              score: 0
            }
            players.update(updates)
            let questions = game
            this.quizGame = new QuizGame(game.length, maxPoints, maxPlayers, true, questions)
          } else {
            playerCount.transaction(function (currentData) {
              return (currentData || 0) - 1
            })
            this.setState({gamefull: true})
          }
        } else {
          this.setState({gamefull: true})
        }
      }.bind(this), false)
    }.bind(this))
  }
  imgLoaded () {
    this.state.imgLoadCount++
    document.querySelector('progress').value = this.state.imgLoadCount
    if (this.state.imgLoadCount === this.maxImg) {
      this.setState({startGame: true})
      setTimeout(() => {
        QuizActions.loadedMultiplayerQuiz(this.quizGame, this.state.gameId)
      }, 0)
    }
  }
  getMaxImgs (val) {
    let size = parseInt(val.value.split(' ')[0], 10)
    return 3 * size + size * 0.4
  }
  render () {
    if (this.state.startGame) {
      return <Redirect to='/joinroom' />
    } else if (this.state.gamefull) {
      return <Redirect to='/multiplayer-main' />
    } else {
      return (
        <div>
          <p>render!</p>
          <progress max={this.maxImg} />
        </div>
      )
    }
  }
}
