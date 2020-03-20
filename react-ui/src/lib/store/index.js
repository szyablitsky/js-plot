import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer, { initialState } from './reducer'

const middlewares = [thunk]

const useDevTools =
  // process.env.NODE_ENV !== 'production' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'

const enhancers = compose(
  applyMiddleware(...middlewares),
  useDevTools ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
)

const store = createStore(reducer, initialState, enhancers)

export default store
