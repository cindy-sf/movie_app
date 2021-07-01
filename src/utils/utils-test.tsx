
import React, { ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react-native'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Reducer } from '@src/redux'
import { lightTheme } from '@src/styles/theme'

function render(
  ui: any,
  {
    store = configureStore({ reducer: Reducer, }),
    ...renderOptions
  }
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react-native'
// override render method
export { render }
