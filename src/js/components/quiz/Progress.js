import React from 'react'

export default class Progress extends React.Component {
  render () {
    return (
      <progress className='no-margin' max={this.props.maxtime} value={this.props.timeleft} />
    )
  }
}
