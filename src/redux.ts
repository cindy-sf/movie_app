import { lightTheme, ThemeAttributes } from '@styles/theme'

interface ThemePayload {
  theme: ThemeAttributes
}

interface ThemeReducer {
  type: string
  payload: ThemeAttributes
}

interface UserData {
  user_mail: string
  user_password: string
  user_picture: string
  user_name: string
  user_tag: string
  user_creation_date: string
}

interface UserReducer {
  type: string
  payload: UserData
}

const SWITCH_THEME = 'SWITCH_THEME'
const USER_CONNECT = 'USER_CONNECT'
const USER_DISCONNECT = 'USER_DISCONNECT'

const themeInitialState: ThemeAttributes = lightTheme
const userInitialState: UserData = {
  user_mail: 'DEFAULT',
  user_password: 'DEFAULT',
  user_picture: 'ToyFaces_Colored_BG_47',
  user_name: 'DEFAULT',
  user_tag: 'DEFAULT',
  user_creation_date: 'DEFAULT',
}

export const signIn = (userInfos: UserData) => ({
  type: USER_CONNECT,
  payload: userInfos,
})

export const logOut = () => ({
  type: USER_DISCONNECT,
})

export const themeToggler = ({ theme }: ThemePayload) => ({
  type: SWITCH_THEME,
  payload: theme,
})

export const fetchUser = async (token: string | null) => {
  try {
    if (!token) return userInitialState
    const userInfosRequest = await fetch('http://api.movieapp.fr/users', {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        'x-access-tokens': token,
      },
    })
    const userInfos = await userInfosRequest.json()
    return userInfos.data
  } catch {
    return userInitialState
  }
}

export const UserConnectionReducer = (
  state = userInitialState,
  action: UserReducer
) => {
  switch (action.type) {
    case USER_CONNECT:
      return action.payload
    case USER_DISCONNECT:
    default:
      return state
  }
}

export const UserThemeReducer = (
  state = themeInitialState,
  action: ThemeReducer
) => {
  switch (action.type) {
    case SWITCH_THEME:
      return action.payload
    default:
      return state
  }
}
