import React, { FC, ReactElement } from 'react'
// @Todo: Fix import
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { lightTheme } from '@src/styles/theme'

const AllTheProviders: FC = ({ children }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
)

const customRender = (ui: ReactElement) =>
  render(ui, { wrapper: AllTheProviders })

// re-export everything
// @Todo: Fix import
// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
