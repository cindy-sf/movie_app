import React from 'react'
import type { NavigationContainerRef } from '@react-navigation/core'
import type { Movie, SearchData } from '@src/types'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'

import { colors, radius, spaces } from '@src/styles/theme'

const Card = styled.TouchableOpacity`
  margin-right: ${spaces.LARGE}px;
`

const ImageWrapper = styled.View`
  border-radius: ${radius.LARGE}px;
  overflow: hidden;
  background-color: ${colors.PURPLE};
  margin-bottom: ${spaces.SMALL}px;
  height: 260px;
  width: 165px;
`

interface Props {
  navigation: NavigationContainerRef
  movie: Movie | SearchData
}

const MovieCard = ({ navigation, movie }: Props) => (
  <Card
    onPress={(): void =>
      navigation.navigate('MovieDetails', {
        movieId: movie.id,
      })
    }
  >
    <ImageWrapper>
      <Image
        src={{ uri: movie.poster }}
        height={260}
        width={165}
        resizeMode="cover"
      />
    </ImageWrapper>
    <Text
      font="POPPINS_SEMI_BOLD"
      textAlign="left"
      size="BODY_1"
      maxWidth={165}
      limit={movie.title.length > 20 ? 20 : 0}
      numberOfLines={1}
    >
      {movie.title}
    </Text>
  </Card>
)

export default MovieCard
