import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'

import DarkThemePreview from '@assets/images/themes/dark_theme_preview.png'
import LightThemePreview from '@assets/images/themes/light_theme_preview.png'

import { borderWidth, colors, radius, spaces } from '@src/styles/theme'

const ThemeSelectionWrapper = styled.View`
  align-items: center;
  border-style: solid;
  border-width: ${borderWidth.MEDIUM}px;
  border-radius: ${radius.LARGE}px;
  width: 150px;
  height: 220px;
  overflow: hidden;
  margin-bottom: ${spaces.X_SMALL}px;
  border-color: ${(props: { isSelectedTheme: boolean }) =>
    `${props.isSelectedTheme ? colors.PURPLE : 'transparent'}`};
`

interface Props {
  onPress: () => Promise<void>
  theme: 'Clair' | 'Foncé'
  isSelectedTheme: boolean
}

const ThemeSelection = ({ onPress, theme, isSelectedTheme }: Props) => (
  <TouchableOpacity onPress={onPress} style={{ marginRight: spaces.MEDIUM }}>
    <ThemeSelectionWrapper isSelectedTheme={isSelectedTheme}>
      <Image
        resizeMode="cover"
        src={theme === 'Clair' ? LightThemePreview : DarkThemePreview}
        width={145}
        height={215}
      />
    </ThemeSelectionWrapper>
    <Text font="POPPINS_MEDIUM" size="BODY_2">
      {theme}
    </Text>
  </TouchableOpacity>
)

export default ThemeSelection
