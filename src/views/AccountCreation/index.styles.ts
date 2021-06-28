import styled from 'styled-components/native'

import { radius, spaces } from '@src/styles/theme'

export const ButtonWrapper = styled.View`
  margin-top: ${spaces.LARGE}px;
  margin-bottom: ${spaces.LARGE}px;
`

export const CarouselWrapper = styled.View`
  margin-top: ${spaces.X_LARGE}px;
  flex: 0.7;
`

export const InputWrapper = styled.View`
  flex: 1;
  margin-top: ${spaces.X_LARGE}px;
`
export const ItemWrapper = styled.View`
  border-radius: ${radius.XX_LARGE}px;
  overflow: hidden;
`
