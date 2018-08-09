import React from 'react'
import { Link } from 'react-router-dom'

export default class CreateGameButton extends React.Component {
  render () {
    return (
      <div id='create'>
        <Link to='/create-multiplayer-game'><button type='submit' id='createBtn' className='StandardButton btn-block'>Create game</button></Link>
      </div>
    )
  }
}
