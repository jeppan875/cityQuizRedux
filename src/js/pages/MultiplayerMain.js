import React from 'react'
import CreateGameButton from '../components/multiplayerMain/CreateGameButton'
import JoinGame from '../components/multiplayerMain/JoinGame'
import * as QuizAction from '../actions/QuizActions'
import { Redirect } from 'react-router'
import QuizStore from '../stores/QuizStore'
import { connect } from 'react-redux'
import { getGameId } from '../actions/multiplayerAction'

class MultiplayerMain extends React.Component {
  constructor () {
    super()
    this.join = this.join.bind(this)
    this.state = {
      clickedJoin: false
    }
  }
  componentWillMount () {
    QuizStore.on('gameid', this.join)
  }
  componentWillUnmount () {
    QuizStore.removeListener('gameid', this.join)
  }
  join () {
    this.setState({clickedJoin: true})
  }
  clickJoin (e) {
    e.preventDefault()
    let value = e.target
    QuizAction.gameId(value.answer.value)
  }
  render () {
    if (this.state.clickedJoin) {
      return <Redirect to='/join' />
    }
    return (
      <div id='multiplayerDiv'>
        <div className='card card-position transparent borders slideInFromRight'>
          <div className='card-body'>
            <CreateGameButton />
          </div>
        </div>
        <div className='card transparent card-position borders slideInFromLeft'>
          <div className='card-body'>
            <JoinGame onSubmit={this.clickJoin} />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  clickedStart: state.createGame.createGame.clickedStart
})

export default connect(mapStateToProps, { getGameId })(MultiplayerMain)
