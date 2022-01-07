import React, { ReactElement } from 'react'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'

import { colors, radius, spaces } from '@styles/theme'

const Card = styled.View`
  margin-right: ${spaces.LARGE}px;
  margin-top: ${spaces.SMALL}px;
  margin-bottom: ${spaces.MEDIUM}px;
  display: flex;
  align-items: center;
`

const ImageWrapper = styled.View`
  border-radius: ${radius.MEDIUM}px;
  margin-bottom: ${spaces.MEDIUM}px;
  width: 124px;
  height: 124px;
  overflow: hidden;
  background-color: ${colors.PURPLE};
`

interface Props {
  picture: string
  name: string
  role: string
}

const ActorCard = ({ picture, name, role }: Props): ReactElement => (
  <Card>
    <ImageWrapper>
      <Image
        height={124}
        width={124}
        resizeMode="cover"
        src={{ uri: `https://image.tmdb.org/t/p/w200/${picture}` }}
      />
    </ImageWrapper>
    <Text maxWidth={124} size="BODY_2">
      {name}
    </Text>
    <Text size="OVERLINE" limit={role.length > 20 ? 20 : 0}>
      {role}
    </Text>
  </Card>
)

export default ActorCard
