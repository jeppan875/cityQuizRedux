import React from 'react'

export default class MultiplayerScoreRow extends React.Component {
  render () {
    return (
      <tr>
        <td>{this.props.player}</td>
        <td>{this.props.score}</td>
      </tr>
    )
  }
}
