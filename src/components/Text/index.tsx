import React from 'react'
import styled from 'styled-components/native'
import { TextProps as RnTextProps } from 'react-native'
import { fonts, fontSize, ThemeAttributes } from '@styles/theme'

export interface TextProps {
  children: string | string[]
  color?: keyof Omit<ThemeAttributes, 'mode'>
  font?: keyof typeof fonts
  limit?: number
  maxWidth?: number
  size?: keyof typeof fontSize
  textAlign?: 'center' | 'left' | 'right'
  textDecoration?: string
}

const CustomText = styled.Text`
  color: ${(props: { color: TextProps['color']; theme: ThemeAttributes }) =>
    props.color && `${props.theme[props.color]}`};
  font-size: ${(props: { size: string }) => `${props.size}px`};
  font-family: ${(props: { font: string }) => `${props.font}`};
  max-width: ${(props: { maxWidth: number }) =>
    props.maxWidth ? `${props.maxWidth}px` : '100%'};
  text-align: ${(props: { textAlign: string }) => `${props.textAlign}`};
  text-decoration: ${(props: { textDecoration: string }) =>
    `${props.textDecoration}`};
`

const Text: React.FC<TextProps & RnTextProps> = ({
  children,
  color = 'PRIMARY_TEXT_COLOR',
  font = 'POPPINS_REGULAR',
  size = 'SUBTITLE',
  maxWidth,
  limit,
  textAlign = 'center',
  textDecoration = 'none',
  ...rest
}) => (
  <CustomText
    color={color}
    maxWidth={maxWidth}
    font={fonts[font]}
    size={fontSize[size]}
    textAlign={textAlign}
    textDecoration={textDecoration}
    {...rest}
  >
    {limit && typeof children === 'string'
      ? `${children.substring(0, limit)}...`
      : children}
  </CustomText>
)

export default Text
