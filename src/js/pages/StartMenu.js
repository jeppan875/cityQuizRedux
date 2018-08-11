import React from 'react'
import fire from '../../fire'
import Header from '../components/startmenu/Header'
import MultiplayerButton from '../components/startmenu/MultiplayerButton'
import SelectGameType from '../components/multiplayerCreateGame/SelectGameType'
import * as QuizAction from '../actions/QuizActions'
import CreateGameButton from '../components/multiplayerCreateGame/CreateButton'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { createGame } from '../actions/createGameAction'
import store from '../store'

class StartMenu extends React.Component {
  constructor () {
    super()
    this.authListener = this.authListener.bind(this)
  }

  componentWillMount () {
    this.authListener()
  }
  componentWillUnmount () {
    this.props.createGame(false)
    console.log(store.getState())
  }
  clickStart (e) {
    console.log(this.props)
    e.preventDefault()
    let value = e.target
    QuizAction.gameType(value.gametype.value)
    this.props.createGame(true, parseInt(value.gametype.value.split(' ')[0], 10), parseInt(value.gametype.value.split(' ')[1]), 10)
  }
  authListener () {
    fire.auth().onAuthStateChanged(() => {
      let user = fire.auth().currentUser
      if (user) {
        document.querySelector('#loginBtn').style.display = 'none'
        document.querySelector('#signoutBtn').style.display = 'inline-block'
      } else {
      }
    })
  }
  render () {
    if (this.props.clickedStart) {
      return <Redirect to='/load-quiz' />
    }
    return (
      <div>
        <div className='card card-position transparent borders slideInFromTop'>
          <div className='card-body'>
            <Header />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromLeft'>
          <div className='card-body'>
            <form onSubmit={this.clickStart.bind(this)}>
              <SelectGameType />
              <CreateGameButton />
            </form>
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromLeft'>
          <div className='card-body'>
            <MultiplayerButton />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  clickedStart: state.createGame.createGame.clickedStart
})

export default connect(mapStateToProps, { createGame })(StartMenu)
