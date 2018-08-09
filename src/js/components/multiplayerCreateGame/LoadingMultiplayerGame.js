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
    window.history.replaceState(null, null, '/multiplayer-main')
    this.imgLoaded = this.imgLoaded.bind(this)
    this.state = {
      gameType: QuizStore.getGameType(),
      imgLoadCount: 0,
      startGame: false,
      maxPlayers: parseInt(QuizStore.getMaxPlayers(), 10)
    }
    this.gameId = null
    this.imgLoadCount = 0
    this.maxImg = this.getMaxImgs(this.state.gameType)
    this.quizGame = new QuizGame(parseInt(this.state.gameType.split(' ')[0], 10), this.state.gameType.split(' ')[1] || 1000, this.state.maxPlayers, false)
  }
  componentWillMount () {
    QuizStore.on('img-loaded', this.imgLoaded)
  }
  componentWillUnmount () {
    QuizStore.removeListener('img-loaded', this.imgLoaded)
  }
  imgLoaded () {
    this.state.imgLoadCount++
    document.querySelector('progress').value = this.state.imgLoadCount
    if (this.state.imgLoadCount === this.maxImg) {
      this.setState({startGame: true})
      this.sendToDataBase(this.quizGame)
      setTimeout(() => {
        QuizActions.loadedMultiplayerQuiz(this.quizGame, this.gameId)
      }, 0)
    }
  }
  sendToDataBase (qg) {
    console.log('sendtodatabase')
    let user = firebase.auth().currentUser
    let gameRef = database.ref('games').push()
    this.gameId = gameRef.key
    gameRef.set({
      players: null,
      game: qg,
      playerCount: 1,
      maxPlayers: qg.playerCount,
      readyCount: 0,
      nextCount: 0
    })
    let players = database.ref(`games/${gameRef.key}/players`)
    let updates = {}
    updates[`/${user.uid}`] = {
      displayName: user.email,
      uid: user.uid,
      score: 0
    }
    players.update(updates)
  }
  getMaxImgs (val) {
    let size = parseInt(val.split(' ')[0], 10)
    console.log(size)
    return 3 * size + size * 0.4
  }
  render () {
    if (this.state.startGame) {
      return <Redirect to='/joinroom' />
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
