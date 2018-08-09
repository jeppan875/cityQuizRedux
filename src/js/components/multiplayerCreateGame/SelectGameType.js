import React from 'react'

export default class SelectGameType extends React.Component {
  render () {
    return (
      <div>
        <h5 className='no-margin'>Select game type:</h5>
        <div id='gameoption'>
          <div className='inline'>
            <div className='inline'>
              <input type='radio' className='option-input radio' id='five-questions' name='gametype' value='5' defaultChecked />
              <label htmlFor='five-questions'>Small</label>
            </div>
            <div className='inline'>
              <input type='radio' className='option-input radio' id='hundred-points' name='gametype' value='30 100' />
              <label htmlFor='hundred-points'>100 points</label>
            </div>
            <div className='inline'>
              <input type='radio' className='option-input radio' id='ten-questions' name='gametype' value='10' />
              <label htmlFor='ten-questions'>Medium</label>
            </div>
          </div>
          <div className='inline'>
            <div className='inline'>
              <input type='radio' className='option-input radio' id='twohundred-points' name='gametype' value='30 200' />
              <label htmlFor='twohundred-points'>200 points</label>
            </div>
            <div className='inline'>
              <input type='radio' className='option-input radio' id='twenty-questions' name='gametype' value='20' />
              <label htmlFor='twenty-questions'>Grand</label>
            </div>
            <div className='inline'>
              <input type='radio' className='option-input radio' id='threehundred-points' name='gametype' value='30 300' />
              <label htmlFor='threehundred-points'>300 points</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
