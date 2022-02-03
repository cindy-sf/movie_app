import React from 'react'
import { View } from 'react-native'

import Image from '@components/Image'
import Text from '@components/Text'

import { colors, radius, spaces, ThemeAttributes } from '@src/styles/theme'

import styled from 'styled-components/native'
import { gendersIcon } from './constants'

const Card = styled.TouchableOpacity`
  margin: ${spaces.MEDIUM}px ${spaces.SMALL}px;
  margin-left: 0;
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
    <View style={{ marginBottom: spaces.XX_SMALL }}>
      <Image
        width={24}
        height={24}
        src={gendersIcon[gender] || gendersIcon.UnknowGender}
      />
    </View>
    <Text font="POPPINS_SEMI_BOLD" size="BODY_2">
      {gender}
    </Text>
  </Card>
)

export default GenderCard
