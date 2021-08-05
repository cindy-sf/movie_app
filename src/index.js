import React from 'react'
import { Provider } from 'react-redux'
import { registerRootComponent } from 'expo'
import { combineReducers, createStore } from 'redux'
import App from './App'
import { UserConnectionReducer, UserThemeReducer } from './redux'

const store = createStore(
  combineReducers({ theme: UserThemeReducer, users: UserConnectionReducer })
)

registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
))
