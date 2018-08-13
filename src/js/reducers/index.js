import { combineReducers } from 'redux'
import createGameReducer from './createGameReducer'
import gameReducer from './gameReducer'

export default combineReducers({
  createGame: createGameReducer,
  game: gameReducer
})
