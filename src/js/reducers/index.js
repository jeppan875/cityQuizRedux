import { combineReducers } from 'redux'
import createGameReducer from './createGameReducer'

export default combineReducers({
  createGame: createGameReducer
})
