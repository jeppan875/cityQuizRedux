import React from 'react'
import { Redirect } from 'react-router'
import * as QuizAction from '../actions/QuizActions'
import NumberOfPlayers from '../components/multiplayerCreateGame/NumberOfPlayers'
import SelectGameType from '../components/multiplayerCreateGame/SelectGameType'
import CreateGameButton from '../components/multiplayerCreateGame/CreateButton'

export default class CreateGameForm extends React.Component {
  constructor () {
    super()
    this.state = {
      clickedstart: false
    }
  }
  clickStart (e) {
    e.preventDefault()
    let value = e.target
    QuizAction.maxPlayers(value.nrPlayers.value)
    QuizAction.gameType(value.gametype.value)
    this.setState({clickedstart: true})
  }
  render () {
    if (this.state.clickedstart) {
      return <Redirect to='/loading-multiplayer-game' />
    }
    return (
      <form onSubmit={this.clickStart.bind(this)}>
        <div className='card card-position transparent borders slideInFromTop'>
          <div className='card-body'>
            <SelectGameType />
          </div>
        </div>
        <div className='card card-position transparent borders slideInFromRight'>
          <div className='card-body'>
            <NumberOfPlayers />
          </div>
        </div>
        <div className='card card-position transparent borders slideInFromBottom'>
          <div className='card-body'>
            <CreateGameButton />
          </div>
        </div>
      </form>
    )
  }
}
