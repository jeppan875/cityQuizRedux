import React from 'react'
import { Redirect } from 'react-router'
import QuizGame from '../game/QuizGame'
import { connect } from 'react-redux'
import { startGame, getMaxImg } from '../actions/createGameAction'
import store from '../store'

class LoadQuiz extends React.Component {
  componentWillMount () {
    this.imgLoadCount = 0
    this.props.getMaxImg(this.getMaxImgs(this.props.gameType))
    this.quizGame = new QuizGame(this.props.gameType, this.props.score || 1000, 1, false)
  }
  componentWillUnmount () {
    console.log(store.getState())
  }
  componentDidUpdate () {
    if (this.props.imgLoaded === this.props.maxImg) {
      this.props.startGame()
    }
  }

  getMaxImgs (size) {
    return 3 * size + size * 0.4
  }
  render () {
    if (this.props.startGame) {
      return <Redirect to='/quiz' />
    } else {
      return (
        <div>
          <p>render!</p>
          <progress max={this.maxImg} value={this.props.imgLoaded} />
        </div>
      )
    }
  }
}
const mapStateToProps = state => ({
  gameType: state.createGame.createGame.gameType,
  score: state.createGame.createGame.score,
  imgLoaded: state.createGame.imgLoaded,
  maxImg: state.createGame.maxImg,
  startGame: state.createGame.startGame
})

export default connect(mapStateToProps, { startGame, getMaxImg })(LoadQuiz)
