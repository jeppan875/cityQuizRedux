import React, { Component } from 'react'
// import logo from './logo.svg'
import { Provider } from 'react-redux'
import store from '../src/js/store'
import './App.css'
import StartMenu from './js/pages/StartMenu'
import EndGame from './js/pages/EndGame'
import Quiz from './js/pages/Quiz'
import Login from './js/pages/Login'
import MultiplayerMain from './js/pages/MultiplayerMain'
import { Route, Switch } from 'react-router'
import LoadQuiz from './js/pages/LoadingQuiz'
import LoadingMultiplayerGame from './js/components/multiplayerCreateGame/LoadingMultiplayerGame'
import LoadingMultiplayerJoiner from './js/components/multiplayerJoinRoom/LoadingMultiplayerJoiner'
import MultiplayerJoinRoom from './js/pages/MultiplayerJoinRoom'
import MultiplayerCreateGame from './js/pages/MultiplayerCreateGame'
import MultiplayerQuizGame from './js/pages/MultiplayerQuizGame'
import MultiplayerEndGame from './js/pages/MultiplayerEndGame'
import fire from './fire'
import PrivateRoute from './PrivateRoute'
import * as firebase from 'firebase'
const database = firebase.database()

class App extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      authenticated: false,
      currentUser: null
    }
  }

  componentWillMount () {
    if (window.location.pathname === '/') {
      window.history.pushState(null, null, '/')
    }
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        })
        let userRef = database.ref(`users/${user.uid}`)
        userRef.once('value', function (snapshot) {
          console.log(snapshot.val())
          let level = snapshot.child('level').val()
          let experience = snapshot.child('experience').val()
          console.log(level)
          console.log(experience)
        })
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        })
      }
    })
  }
  render () {
    if (this.state.loading) {
      return <p> loading </p>
    }
    return (
      <Provider store={store}>
        <div id='wrapper' className='main-background'>
          <main>
            <Switch>
              <PrivateRoute authenticated={this.state.authenticated} path='/' exact component={StartMenu} />
              <PrivateRoute authenticated={this.state.authenticated} path='/quiz' component={Quiz} />
              <PrivateRoute authenticated={this.state.authenticated} path='/load-quiz' component={LoadQuiz} />
              <PrivateRoute authenticated={this.state.authenticated} path='/end-game' component={EndGame} />
              <PrivateRoute authenticated={this.state.authenticated} path='/login' component={Login} />
              <PrivateRoute authenticated={this.state.authenticated} path='/multiplayer-main' component={MultiplayerMain} />
              <PrivateRoute authenticated={this.state.authenticated} path='/create-multiplayer-game' component={MultiplayerCreateGame} />
              <PrivateRoute authenticated={this.state.authenticated} path='/loading-multiplayer-game' component={LoadingMultiplayerGame} />
              <PrivateRoute authenticated={this.state.authenticated} path='/join' component={LoadingMultiplayerJoiner} />
              <PrivateRoute authenticated={this.state.authenticated} path='/joinroom' component={MultiplayerJoinRoom} />
              <PrivateRoute authenticated={this.state.authenticated} path='/multiplayer-quiz' component={MultiplayerQuizGame} />
              <PrivateRoute authenticated={this.state.authenticated} path='/multiplayer-endgame' component={MultiplayerEndGame} />
              <Route component={StartMenu} />
            </Switch>
          </main>
        </div>
      </Provider>
    )
  }
}

export default App
