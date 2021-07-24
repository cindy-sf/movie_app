import React from 'react'

import Text from '@components/Text'

import { colors, radius, spaces, ThemeAttributes } from '@src/styles/theme'

import styled from 'styled-components/native'

const Card = styled.TouchableOpacity`
  margin: ${spaces.MEDIUM}px ${spaces.X_SMALL}px;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.INPUT_BACKGROUND};
  border-radius: ${radius.SMALL}px;
  shadow-color: ${colors.BLACK};
  shadow-offset: 0px 4px;
  shadow-radius: 4.65px;
  elevation: 8;
  shadow-opacity: 0.3;
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
