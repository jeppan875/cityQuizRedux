import React from 'react'
import { Redirect } from 'react-router'
import QuizStore from '../stores/QuizStore'
import QuizGame from '../game/QuizGame'
import * as QuizActions from '../actions/QuizActions'
import { connect } from 'react-redux'
import { createGame } from '../actions/createGameAction'

class LoadQuiz extends React.Component {
  constructor () {
    super()
    this.imgLoaded = this.imgLoaded.bind(this)
    this.state = {
      imgLoadCount: 0,
      startGame: false
    }
  }
  componentWillMount () {
    QuizStore.on('img-loaded', this.imgLoaded)
    this.imgLoadCount = 0
    this.maxImg = this.getMaxImgs(this.props.gameType)
    this.quizGame = new QuizGame(this.props.gameType, this.props.score || 1000, 1, false)
  }
  componentWillUnmount () {
    QuizStore.removeListener('img-loaded', this.imgLoaded)
  }
  imgLoaded () {
    this.state.imgLoadCount++
    document.querySelector('progress').value = this.state.imgLoadCount
    if (this.state.imgLoadCount === this.maxImg) {
      this.setState({startGame: true})
      setTimeout(() => {
        QuizActions.loadedQuiz(this.quizGame)
      }, 0)
    }
  }
  getMaxImgs (size) {
    return 3 * size + size * 0.4
  }
  render () {
    if (this.state.startGame) {
      return <Redirect to='/quiz' />
    } else {
      return (
        <div>
          <p>render!</p>
          <progress max={this.maxImg} />
        </div>
      )
    }
  }
}
const mapStateToProps = state => ({
  gameType: state.createGame.createGame.gameType,
  score: state.createGame.createGame.score
})

export default connect(mapStateToProps, { createGame })(LoadQuiz)
