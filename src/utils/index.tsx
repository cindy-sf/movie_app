import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  darkTheme,
  lightTheme,
  ThemeAttributes,
  ThemeModeType,
} from '../styles/theme'

export const getAppTheme = async (): Promise<ThemeAttributes> => {
  const DEFAULT_THEME: ThemeModeType = 'light'
  const storedTheme = await AsyncStorage.getItem('theme')

  if (!storedTheme) {
    await AsyncStorage.setItem('theme', DEFAULT_THEME)
    return lightTheme
  }

  if (storedTheme === DEFAULT_THEME) return lightTheme

  return darkTheme
}

export const storeAppTheme = async (theme: ThemeModeType): Promise<void> => {
  await AsyncStorage.setItem('theme', theme)
}

export default getAppTheme
