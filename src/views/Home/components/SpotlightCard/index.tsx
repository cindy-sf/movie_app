import React from 'react'
import { View } from 'react-native'

import Text from '@components/Text'
import Image from '@components/Image'

import { radius, spaces } from '@src/styles/theme'

import type { News } from '../../types'

const SpotlightCard = ({ news }: { news: News }) => (
  <View
    key={news.id}
    style={{
      marginTop: spaces.SMALL,
      marginBottom: spaces.LARGE,
    }}
  >
    <View
      style={{
        borderRadius: radius.LARGE,
        overflow: 'hidden',
        width: 325,
        marginBottom: spaces.SMALL,
      }}
    >
      <Image
        height={190}
        width={325}
        resizeMode="cover"
        src={{ uri: news.picture_url }}
      />
    </View>
    <Text textAlign="left" size="BODY_2" maxWidth={325}>
      {news.title}
    </Text>
  </View>
)

export default SpotlightCard
