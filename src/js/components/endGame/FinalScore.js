import React from 'react'

export default class FinalScore extends React.Component {
  render () {
    return (
      <div>
        <p className='no-margin'>Your score: {this.props.score}</p>
      </div>
    )
  }
}
