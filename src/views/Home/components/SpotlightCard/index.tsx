import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import Text from '@components/Text'
import Image from '@components/Image'

import { radius, spaces } from '@src/styles/theme'

import type { News } from '../../types'

const ImageWrapper = styled.View`
  border-radius: ${radius.LARGE}px;
  overflow: hidden;
  width: 325px;
  margin-bottom: ${spaces.SMALL}px;
`

const SpotlightCardWrapper = styled.View`
  margin-top: ${spaces.SMALL}px;
  margin-bottom: ${spaces.LARGE}px;
`

const SpotlightCard = ({ news }: { news: News }) => (
  <SpotlightCardWrapper>
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
