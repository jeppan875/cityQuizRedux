import React from 'react'

export default class Question extends React.Component {
  render () {
    return (
      <h5 className='card-title font-size-16 no-margin'>{this.props.question}</h5>
    )
  }
}
