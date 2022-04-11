import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import index from './reducers'
import reduxWeb3 from './reducers/web3'

const store = createStore(
  combineReducers({
    index,
    reduxWeb3
  }),
  applyMiddleware(thunkMiddleware)
)

export default store
