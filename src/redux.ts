import { lightTheme } from '$styles'
import { ThemeAttributes } from './styles/theme'

const SWITCH_THEME = 'SWITCH_THEME'

interface ThemePayload {
  theme: ThemeAttributes
}

interface ThemeReducer {
  type: string
  payload: ThemePayload
}

export const themeToggler = ({ theme }: ThemePayload) => ({
  type: SWITCH_THEME,
  payload: { theme },
})

const initialState = {
  theme: lightTheme,
}

export const Reducer = (state = initialState, action: ThemeReducer) => {
  switch (action.type) {
    case 'SWITCH_THEME':
      return {
        ...state,
        theme: action.payload.theme,
      }

    default:
      return state
  }
}
