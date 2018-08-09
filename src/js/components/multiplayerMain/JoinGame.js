import React from 'react'

export default class JoinGame extends React.Component {
  render () {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <div>
            <p>Enter game key:</p>
            <input type='text' id='gameid' name='answer' />
          </div>
          <div id='join'>
            <button type='submit' value='submit' id='joinBtn' className='StandardButton btn-block' >Join game</button>
          </div>
        </form>
        <p id='joinError' />
      </div>
    )
  }
}
