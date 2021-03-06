import React from 'react'
import styled from 'styled-components/native'

import { colors, radius, spaces } from '@src/styles/theme'

import Image from '@components/Image'
import Text from '@components/Text'

import type { News } from '../../types'

const ArticleCardWrapper = styled.TouchableOpacity`
  margin-right: ${spaces.X_LARGE}px;
  margin-top: ${spaces.SMALL}px;
`

const ArticleCardContent = styled.View`
  width: 260px;
  height: 155px;
  border-radius: ${radius.MEDIUM}px;
  overflow: hidden;
  margin-bottom: ${spaces.SMALL}px;
  background-color: ${colors.PURPLE};
`

interface Props {
  article: News
  onPress: () => void
}

const ArticleCard = ({ article, onPress }: Props) => (
  <ArticleCardWrapper onPress={onPress}>
    <ArticleCardContent>
      <Image
        height={155}
        width={260}
        resizeMode="cover"
        src={{ uri: article.picture_url }}
      />
    </ArticleCardContent>
    <Text textAlign="left" size="BODY_2" maxWidth={260}>
      {article.title}
    </Text>
  </ArticleCardWrapper>
)

export default ArticleCard
