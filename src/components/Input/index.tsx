import React from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import {
  colors,
  fonts,
  fontSize,
  radius,
  spaces,
  ThemeAttributes,
} from '@src/styles/theme'

interface Props {
  placeHolder: string
  value: string
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

const TextInput = styled.TextInput`
  width: 280px;
  height: 50px;
  border-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.INPUT_BORDER_COLOR};
  border-width: 2px;
  border-style: solid;
  border-radius: ${radius.XX_LARGE}px;
  color: ${({ theme }: { theme: ThemeAttributes }) => theme.PRIMARY_TEXT_COLOR};
  margin-top: ${spaces.LARGE}px;
  padding-top: ${spaces.SMALL}px;
  padding-bottom: ${spaces.SMALL}px;
  padding-left: ${spaces.LARGE}px;
  font-family: ${fonts.POPPINS_SEMI_BOLD};
  font-size: ${fontSize.OVERLINE}px;
`

const Input = ({ placeHolder, value, onChange }: Props) => {
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )

  return (
    <TextInput
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      placeholderTextColor={appTheme === 'light' ? colors.BLACK : colors.WHITE}
    />
  )
}

export default Input
