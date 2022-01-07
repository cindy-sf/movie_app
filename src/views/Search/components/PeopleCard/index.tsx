import React from 'react'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'

import type { PeopleType } from '@src/types'

import { colors, spaces } from '@src/styles/theme'

const Wrapper = styled.View`
  margin-right: ${spaces.LARGE}px;
`

const ImageWrapper = styled.View`
  border-radius: 100px;
  overflow: hidden;
  background-color: ${colors.PURPLE};
  margin-bottom: ${spaces.SMALL}px;
`

const PeopleCard = ({ actor }: { actor: PeopleType }) => (
  <Wrapper>
    <ImageWrapper>
      <Image
        width={130}
        height={130}
        src={{
          uri: `https://image.tmdb.org/t/p/w300/${actor.profile_path}`,
        }}
        resizeMode="cover"
      />
    </ImageWrapper>
    <Text size="BODY_2" font="POPPINS_SEMI_BOLD">
      {actor.name}
    </Text>
  </Wrapper>
)

export default PeopleCard
