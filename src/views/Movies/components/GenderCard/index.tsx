import React from 'react'

import Text from '@components/Text'

import { colors, radius, spaces } from '@src/styles/theme'

import styled from 'styled-components/native'

const Card = styled.TouchableOpacity`
  margin-right: ${spaces.LARGE}px;
  background-color: ${colors.GREY_DARK};
  border-radius: ${radius.SMALL}px;
  padding: ${spaces.MEDIUM}px;
  justify-content: center;
  align-items: flex-start;
  min-width: 150px;
  height: 68px;
`

interface Props {
  gender: string
  onPress: () => void
}

const GenderCard = ({ gender, onPress }: Props) => (
  <Card onPress={onPress}>
    <Text font="POPPINS_SEMI_BOLD" size="BODY_2">
      {gender}
    </Text>
  </Card>
)

export default GenderCard
