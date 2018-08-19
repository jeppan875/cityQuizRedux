import React from 'react'

export default class QuizForm extends React.Component {
  render () {
    return (
      <div>
        <div>
          <div>
            <div className='inline'>
              <input type='radio' id='q1' className='option-input radio inline' name='answer' value={this.props.alternatives[0]} />
              <label htmlFor='q1' id='l1'>{this.props.alternatives[0]}</label>
            </div>
            <div className='inline'>
              <input type='radio' id='q2' className='option-input radio inline' name='answer' value={this.props.alternatives[1]} />
              <label htmlFor='q2' id='l2'>{this.props.alternatives[1]}</label>
            </div>
          </div>
          <div>
            <div className='inline'>
              <input type='radio' id='q3' className='option-input radio inline' name='answer' value={this.props.alternatives[2]} />
              <label htmlFor='q3' id='l3'>{this.props.alternatives[2]}</label>
            </div>
            <div className='inline'>
              <input type='radio' id='q4' className='option-input radio inline' name='answer' value={this.props.alternatives[3]} />
              <label htmlFor='q4' id='l4'>{this.props.alternatives[3]}</label>
            </div>
          </div>
        </div>
        <div id='btn'>
          <button type='submit' id='send' className='StandardButton btn-block'>send</button>
        </div>
      </div>
    )
  }
}
