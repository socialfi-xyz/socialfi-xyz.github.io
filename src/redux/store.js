import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import index from './index'

import {persistStore, persistReducer} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['language', 'darkMode', 'ethPrice', 'woofPrice']
}

const myPersistReducer = persistReducer(
  persistConfig,
  combineReducers({
    index,
  }))
const store = createStore(myPersistReducer, applyMiddleware(thunkMiddleware))
export const persistor = persistStore(store)
export default store

