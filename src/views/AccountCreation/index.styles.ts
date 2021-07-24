import styled from 'styled-components/native'

import { radius, spaces } from '@src/styles/theme'

export const ButtonWrapper = styled.View`
  margin-top: ${spaces.LARGE}px;
  margin-bottom: ${spaces.LARGE}px;
  align-items: center;
`

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})`
  width: 100%;
`

export const TextWrapper = styled.TouchableOpacity`
  margin-bottom: ${spaces.XX_LARGE}px;
`

export const CarouselWrapper = styled.View`
  margin-top: ${spaces.X_LARGE}px;
  align-items: center;
  flex: 0.9;
`

export const InputWrapper = styled.View`
  margin-top: ${spaces.XX_LARGE}px;
  align-items: center;
  justify-content: space-around;
  flex: 1;
`
export const ItemWrapper = styled.View`
  border-radius: ${radius.XX_LARGE}px;
  overflow: hidden;
`
