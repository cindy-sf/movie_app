import React from 'react'
import styled from 'styled-components/native'
import { fonts, fontSize, ThemeAttributes } from '@styles/theme'

export interface TextProps {
  children: string | string[]
  color?: 'primary' | 'secondary'
  font?: keyof typeof fonts
  limit?: number
  maxWidth?: number
  size?: keyof typeof fontSize
  textAlign?: 'center' | 'left' | 'right'
  textDecoration?: string
}

const CustomText = styled.Text`
  color: ${(props: { color: string; theme: ThemeAttributes }) =>
    props.color === 'primary'
      ? props.theme.PRIMARY_TEXT_COLOR
      : props.theme.SECONDARY_TEXT_COLOR};
  font-size: ${(props: { size: string }) => `${props.size}px`};
  font-family: ${(props: { font: string }) => `${props.font}`};
  max-width: ${(props: { maxWidth: number }) =>
    props.maxWidth ? `${props.maxWidth}px` : '100%'};
  text-align: ${(props: { textAlign: string }) => `${props.textAlign}`};
  text-decoration: ${(props: { textDecoration: string }) =>
    `${props.textDecoration}`}; ;
`

const Text: React.FC<TextProps> = ({
  children,
  color = 'primary',
  font = 'POPPINS_REGULAR',
  size = 'SUBTITLE',
  maxWidth,
  limit,
  textAlign = 'center',
  textDecoration = 'none',
}) => (
  <CustomText
    color={color}
    maxWidth={maxWidth}
    font={fonts[font]}
    size={fontSize[size]}
    textAlign={textAlign}
    textDecoration={textDecoration}
  >
    {limit && typeof children === 'string'
      ? `${children.substring(0, limit)}...`
      : children}
  </CustomText>
)

export default Text
