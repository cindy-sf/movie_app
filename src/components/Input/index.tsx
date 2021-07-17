import React, { useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import ShowPasswordIconWhite from '@assets/icons/show_password_icon_white.png'
import ShowPasswordIconBlack from '@assets/icons/show_password_icon_black.png'
import HidePasswordIconWhite from '@assets/icons/hide_password_icon_white.png'
import HidePasswordIconBlack from '@assets/icons/hide_password_icon_black.png'

import Image from '@components/Image'

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
  onChange: (e: string) => void
  secureTextEntry?: boolean
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
  padding-top: ${spaces.SMALL}px;
  padding-bottom: ${spaces.SMALL}px;
  padding-left: ${spaces.LARGE}px;
  font-family: ${fonts.POPPINS_SEMI_BOLD};
  font-size: ${fontSize.OVERLINE}px;
`

const InputWrapper = styled.View`
  position: relative;
  margin-top: ${spaces.LARGE}px;
`

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 13px;
  right: 26px;
  z-index: 10;
  elevation: 10;
`

const Input = ({ placeHolder, value, onChange, secureTextEntry }: Props) => {
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const [isPasswordTextHidden, setIsPasswordTextHidden] =
    useState(secureTextEntry)

  const showPasswordIcon =
    appTheme === 'light' ? ShowPasswordIconBlack : ShowPasswordIconWhite
  const hidePasswordIcon =
    appTheme === 'light' ? HidePasswordIconBlack : HidePasswordIconWhite

  return (
    <InputWrapper>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeHolder}
        placeholderTextColor={
          appTheme === 'light' ? colors.BLACK : colors.WHITE
        }
        secureTextEntry={isPasswordTextHidden}
      />
      {secureTextEntry && (
        <IconWrapper
          onPress={() => setIsPasswordTextHidden(!isPasswordTextHidden)}
        >
          <Image
            width={24}
            height={24}
            src={isPasswordTextHidden ? hidePasswordIcon : showPasswordIcon}
            resizeMode="cover"
          />
        </IconWrapper>
      )}
    </InputWrapper>
  )
}

Input.defaultProps = {
  secureTextEntry: false,
}

export default Input
