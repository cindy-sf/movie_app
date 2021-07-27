import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import Text from '@components/Text'

import { spaces } from '@src/styles/theme'

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: ${spaces.LARGE}px;
  margin-bottom: ${spaces.LARGE}px;
`

interface Props {
  text: string
  onShowAllPress: () => void
}

const MovieTypeTitle = ({ text, onShowAllPress }: Props) => (
  <TitleWrapper>
    <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_2" textAlign="left">
      {text}
    </Text>
    <TouchableOpacity onPress={onShowAllPress}>
      <Text font="POPPINS_MEDIUM" size="BODY_2">
        Voir tout &gt;
      </Text>
    </TouchableOpacity>
  </TitleWrapper>
)

export default MovieTypeTitle
