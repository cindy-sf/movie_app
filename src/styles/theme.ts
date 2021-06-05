interface Themes {
  DARK: 'dark'
  LIGHT: 'light'
}

export type ThemeModeType = 'dark' | 'light'

export interface ThemeAttributes {
  mode: ThemeModeType
  BACKGROUND: string
  AVATAR_BORDER: string
  INPUT_BACKGROUND: string
  PRIMARY_TEXT_COLOR: string
  SECONDARY_TEXT_COLOR: string
  TERTIARY_TEXT_COLOR: string
  PRIMARY_BUTTON_COLOR: string
  PRIMARY_ICON_COLOR: string
  SECONDARY_ICON_COLOR: string
  TERTIARY_ICON_COLOR: string
}

export const borderWidth: { [key: string]: number } = {
  X_SMALL: 1,
  SMALL: 2,
  MEDIUM: 4,
}

export const colors: { [key: string]: string } = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BLACK_MEDIUM: '#181818',
  BLUE: '#3200BB',
  YELLOW: '#FECC00',
  YELLOW_DARK: 'rgba(254, 204, 0, 1)',
  PURPLE: 'rgba(116, 51, 255, 1)',
  RED: '#DF0808',
  GREY_LIGHT: '#E3E3E3',
  GREY_MEDIUM: '#C4C4C4',
  GREY_DARK: '#3F3F3F',
}

export const fonts: { [key: string]: string } = {
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_ITALIC: 'Poppins-Italic',
  POPPINS_MEDIUM: 'Poppins-Medium',
  POPPINS_REGULAR: 'Poppins-Regular',
  POPPINS_SEMI_BOLD: 'Poppins-SemiBold',
}

export const fontSize: { [key: string]: number } = {
  HEADLINE_1: 28,
  HEADLINE_2: 24,
  SUBTITLE: 18,
  BODY_1: 16,
  BODY_2: 14,
  OVERLINE: 12,
}

export const shadows: { [key: string]: string } = {
  NORMAL: '0px 2px 12px -1px rgba(0, 0, 0, 0.25)',
  DARKER: '0px 3px 8px 1px rgba(0, 0, 0, 0.17)',
}

export const radius: { [key: string]: number } = {
  SMALL: 12,
  MEDIUM: 20,
  LARGE: 22,
  X_LARGE: 32,
  XX_LARGE: 38,
  XXX_LARGE: 40,
}

export const spaces: { [key: string]: number } = {
  XX_SMALL: 4,
  X_SMALL: 8,
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 24,
  X_LARGE: 32,
  XX_LARGE: 42,
  XXX_LARGE: 54,
}

export const themes: Themes = {
  DARK: 'dark',
  LIGHT: 'light',
}

export const darkTheme: ThemeAttributes = {
  mode: themes.DARK,
  BACKGROUND: colors.BLACK_MEDIUM,
  AVATAR_BORDER: colors.PURPLE,
  INPUT_BACKGROUND: colors.GREY_DARK,
  PRIMARY_TEXT_COLOR: colors.WHITE,
  SECONDARY_TEXT_COLOR: colors.BLUE,
  TERTIARY_TEXT_COLOR: colors.GREY_MEDIUM,
  PRIMARY_BUTTON_COLOR: colors.WHITE,
  PRIMARY_ICON_COLOR: colors.WHITE,
  SECONDARY_ICON_COLOR: colors.YELLOW,
  TERTIARY_ICON_COLOR: colors.YELLOW_DARK,
}

export const lightTheme: ThemeAttributes = {
  mode: themes.LIGHT,
  BACKGROUND: colors.WHITE,
  AVATAR_BORDER: colors.PURPLE,
  INPUT_BACKGROUND: colors.GREY_LIGHT,
  PRIMARY_TEXT_COLOR: colors.BLACK,
  SECONDARY_TEXT_COLOR: colors.WHITE,
  TERTIARY_TEXT_COLOR: colors.BLACK,
  PRIMARY_BUTTON_COLOR: colors.BLUE,
  PRIMARY_ICON_COLOR: colors.RED,
  SECONDARY_ICON_COLOR: colors.YELLOW,
  TERTIARY_ICON_COLOR: colors.YELLOW_DARK,
}
