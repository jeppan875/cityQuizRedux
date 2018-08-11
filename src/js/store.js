import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
const initialState = {}

const middleware = applyMiddleware(thunk)
const store = createStore(reducer, initialState, middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
