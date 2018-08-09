import React from 'react'

export default class CreateGameButton extends React.Component {
  render () {
    return (
      <div id='btn'>
        <button type='submit' value='submit' id='start' className='StandardButton btn-block'>Start</button>
      </div>
    )
  }
}
