import React from 'react'
import Question from '../components/quiz/Question'

export default class Quiz extends React.Component {
  constructor () {
    super()
    window.history.replaceState(null, null, '/')
  }
  render () {
    return (
      <Question />
    )
  }
}
