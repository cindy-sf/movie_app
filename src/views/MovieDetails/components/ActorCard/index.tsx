import React from 'react'
import styled from 'styled-components/native'

import Text from '@components/Text'
import Image from '@components/Image'

import { colors, radius, spaces } from '@styles/theme'
import type { MovieActor } from '@src/views/MovieDetails/types'

const ImageWrapper = styled.View`
  width: 124px;
  height: 124px;
  border-radius: ${radius.MEDIUM}px;
  margin-bottom: ${spaces.LARGE}px;
  overflow: hidden;
  background-color: ${colors.PURPLE};
`

const CardWrapper = styled.View`
  margin-right: ${spaces.LARGE}px;
  margin-top: ${spaces.MEDIUM}px;
  max-width: 124px;
`

const ActorCard = ({ name, picture, role }: MovieActor) => (
  <CardWrapper>
    <ImageWrapper>
      <Image height={124} width={124} src={{ uri: picture }} />
    </ImageWrapper>
    <Text font="POPPINS_BOLD" size="BODY_2">
      {name}
    </Text>
    <Text font="POPPINS_MEDIUM" size="OVERLINE">
      {role}
    </Text>
  </CardWrapper>
)

export default ActorCard
