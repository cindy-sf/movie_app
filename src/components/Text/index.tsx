import React from 'react'
import styled from 'styled-components/native'
import { fonts, fontSize, ThemeAttributes } from '$styles'

export interface TextProps {
  children: string
  size?: keyof typeof fontSize
  font?: keyof typeof fonts
  maxWidth?: number
  limit?: number
}

const Texte = styled.Text<TextProps>`
  color: ${({ theme }: { theme: ThemeAttributes }) => theme.PRIMARY_TEXT_COLOR};
  font-size: ${(props: { size: string }) => `${props.size}px`};
  font-family: ${(props: { font: string }) => `${props.font}`};
  max-width: ${(props: { maxWidth: number }) =>
    props.maxWidth ? `${props.maxWidth}px` : '100%'};
`

const Text: React.FC<TextProps> = ({
  children,
  font = 'POPPINS_REGULAR',
  size = 'SUBTITLE',
  maxWidth,
  limit,
}) => (
  <Texte size={fontSize[size]} font={fonts[font]} maxWidth={maxWidth}>
    {limit ? `${children.substring(0, limit)}...` : children}
  </Texte>
)

export default Text
