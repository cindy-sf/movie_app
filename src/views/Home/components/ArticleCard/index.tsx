import React from 'react'
import styled from 'styled-components/native'

import { colors, radius, spaces } from '@src/styles/theme'

import Image from '@components/Image'
import Text from '@components/Text'

import type { News } from '../../types'

const ArticleCardWrapper = styled.View`
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

const ArticleCard = ({ article }: { article: News }) => (
  <ArticleCardWrapper>
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
