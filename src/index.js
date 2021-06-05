import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { registerRootComponent } from 'expo'
import { createStore } from 'redux'
import App from './App'
import { Reducer } from './redux'

const store = createStore(Reducer)

registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
))
