import React from 'react'

export default class NumberOfPlayers extends React.Component {
  render () {
    return (
      <div>
        <h5 className='no-margin'>Number of players:</h5>
        <div id='playerNumber'>
          <div>
            <input type='radio' id='two' className='option-input radio' name='nrPlayers' value='2' defaultChecked />
            <label htmlFor='two'>Two</label>
          </div>
          <div>
            <input type='radio' id='three' className='option-input radio' name='nrPlayers' value='3' />
            <label htmlFor='three'>Three</label>
          </div>
          <div>
            <input type='radio' id='four' className='option-input radio' name='nrPlayers' value='4' />
            <label htmlFor='four'>Four</label>
          </div>
        </div>
      </div>
    )
  }
}
