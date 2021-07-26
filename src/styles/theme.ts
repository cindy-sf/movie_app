interface Themes {
  DARK: 'dark'
  LIGHT: 'light'
}

export type ThemeModeType = 'dark' | 'light'

export interface ThemeAttributes {
  mode: ThemeModeType
  BACKGROUND: string
  BOTTOM_SHEET_BACKGROUND: string
  RATING_US_CARD_BACKGROUND: string
  AVATAR_BORDER: string
  INPUT_BACKGROUND: string
  INPUT_BORDER_COLOR: string
  ALERT_TEXT_COLOR: string
  PRIMARY_TEXT_COLOR: string
  SECONDARY_TEXT_COLOR: string
  TERTIARY_TEXT_COLOR: string
  ERROR_TEXT_COLOR: string
  PRIMARY_BUTTON_COLOR: string
  PRIMARY_ICON_COLOR: string
  SECONDARY_ICON_COLOR: string
  TERTIARY_ICON_COLOR: string
}

export const borderWidth = {
  X_SMALL: 1,
  SMALL: 2,
  MEDIUM: 4,
}

export const colors = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BLACK_MEDIUM: '#181818',
  BLUE: '#3200BB',
  YELLOW: '#FECC00',
  YELLOW_DARK: 'rgba(254, 204, 0, 1)',
  PURPLE: 'rgba(116, 51, 255, 1)',
  PURPLE_LIGHT: '#D5D7FE',
  RED: '#DF0808',
  GREY_LIGHT: '#E3E3E3',
  GREY_MEDIUM: '#C4C4C4',
  GREY_DARK: '#3F3F3F',
}

export const fonts = {
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_ITALIC: 'Poppins-Italic',
  POPPINS_MEDIUM: 'Poppins-Medium',
  POPPINS_REGULAR: 'Poppins-Regular',
  POPPINS_SEMI_BOLD: 'Poppins-SemiBold',
}

export const fontSize = {
  HEADLINE_1: 28,
  HEADLINE_2: 24,
  SUBTITLE: 18,
  BODY_1: 16,
  BODY_2: 14,
  OVERLINE: 12,
}

export const shadows = {
  NORMAL: '0px 2px 12px -1px rgba(0, 0, 0, 0.25)',
  DARKER: '0px 3px 8px 1px rgba(0, 0, 0, 0.17)',
}

export const radius = {
  SMALL: 12,
  MEDIUM: 20,
  LARGE: 22,
  X_LARGE: 32,
  XX_LARGE: 38,
  XXX_LARGE: 40,
}

export const spaces = {
  NONE: 0,
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
  BOTTOM_SHEET_BACKGROUND: colors.BLACK,
  RATING_US_CARD_BACKGROUND: colors.PURPLE,
  AVATAR_BORDER: colors.PURPLE,
  INPUT_BACKGROUND: colors.GREY_DARK,
  INPUT_BORDER_COLOR: colors.WHITE,
  ALERT_TEXT_COLOR: colors.WHITE,
  PRIMARY_TEXT_COLOR: colors.WHITE,
  SECONDARY_TEXT_COLOR: colors.BLUE,
  TERTIARY_TEXT_COLOR: colors.GREY_MEDIUM,
  ERROR_TEXT_COLOR: colors.RED,
  PRIMARY_BUTTON_COLOR: colors.WHITE,
  PRIMARY_ICON_COLOR: colors.WHITE,
  SECONDARY_ICON_COLOR: colors.YELLOW,
  TERTIARY_ICON_COLOR: colors.YELLOW_DARK,
}

export const lightTheme: ThemeAttributes = {
  mode: themes.LIGHT,
  BACKGROUND: colors.WHITE,
  BOTTOM_SHEET_BACKGROUND: colors.WHITE,
  RATING_US_CARD_BACKGROUND: colors.PURPLE_LIGHT,
  AVATAR_BORDER: colors.PURPLE,
  INPUT_BACKGROUND: colors.WHITE,
  INPUT_BORDER_COLOR: colors.BLACK,
  ALERT_TEXT_COLOR: colors.WHITE,
  PRIMARY_TEXT_COLOR: colors.BLACK,
  SECONDARY_TEXT_COLOR: colors.WHITE,
  TERTIARY_TEXT_COLOR: colors.BLACK,
  ERROR_TEXT_COLOR: colors.RED,
  PRIMARY_BUTTON_COLOR: colors.BLUE,
  PRIMARY_ICON_COLOR: colors.RED,
  SECONDARY_ICON_COLOR: colors.YELLOW,
  TERTIARY_ICON_COLOR: colors.YELLOW_DARK,
}
