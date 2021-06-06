import { lightTheme, ThemeAttributes } from '@styles/theme'

interface ThemePayload {
  theme: ThemeAttributes
}

interface ThemeReducer {
  type: string
  payload: ThemePayload
}

const SWITCH_THEME = 'SWITCH_THEME'

const initialState = {
  theme: lightTheme,
}

export const themeToggler = ({ theme }: ThemePayload) => ({
  type: SWITCH_THEME,
  payload: { theme },
})

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
