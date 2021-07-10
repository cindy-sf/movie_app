import React from 'react'
import styled from 'styled-components/native'

import { colors, radius, spaces } from '@src/styles/theme'

import Image from '@components/Image'
import Text from '@components/Text'

import type { News } from '../../types'

const ImageWrapper = styled.View`
  border-radius: ${radius.LARGE}px;
  overflow: hidden;
  width: 325px;
  margin-bottom: ${spaces.SMALL}px;
  background-color: ${colors.PURPLE};
`

const SpotlightCardWrapper = styled.TouchableOpacity`
  margin-top: ${spaces.SMALL}px;
  margin-bottom: ${spaces.SMALL}px;
`

interface Props {
  news: News
  onPress: () => void
}

const SpotlightCard = ({ news, onPress }: Props) => (
  <SpotlightCardWrapper onPress={onPress}>
    <ImageWrapper>
      <Image
        height={190}
        width={325}
        resizeMode="cover"
        src={{ uri: news.picture_url }}
      />
    </ImageWrapper>
    <Text textAlign="left" size="BODY_2" maxWidth={325}>
      {news.title}
    </Text>
  </SpotlightCardWrapper>
)

export default SpotlightCard
