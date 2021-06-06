import React from 'react'
import styled from 'styled-components/native'
import { fonts, fontSize, ThemeAttributes } from '$styles'

export interface TextProps {
  children: string
  color?: 'primary' | 'secondary'
  font?: keyof typeof fonts
  limit?: number
  maxWidth?: number
  size?: keyof typeof fontSize
  textAlign?: 'center' | 'left' | 'right'
}

const Text = styled.Text`
  color: ${(props: { color: string; theme: ThemeAttributes }) =>
    props.color === 'primary'
      ? props.theme.PRIMARY_TEXT_COLOR
      : props.theme.PRIMARY_BUTTON_COLOR};
  font-size: ${(props: { size: string }) => `${props.size}px`};
  font-family: ${(props: { font: string }) => `${props.font}`};
  max-width: ${(props: { maxWidth: number }) =>
    props.maxWidth ? `${props.maxWidth}px` : '100%'};
  text-align: ${(props: { textAlign: string }) => `${props.textAlign}`};
`

const TextComponent: React.FC<TextProps> = ({
  children,
  color = 'primary',
  font = 'POPPINS_REGULAR',
  size = 'SUBTITLE',
  maxWidth,
  limit,
  textAlign = 'center',
}) => (
  <Text
    color={color}
    maxWidth={maxWidth}
    font={fonts[font]}
    size={fontSize[size]}
    textAlign={textAlign}
  >
    {limit ? `${children.substring(0, limit)}...` : children}
  </Text>
)

export default TextComponent
