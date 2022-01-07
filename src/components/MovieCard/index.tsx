import React from 'react'
import type { MovieDetails } from '@src/types'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'
import RatingStar from '@components/RatingStar'

import { colors, radius, spaces } from '@src/styles/theme'

import type { SimilarMoviesResult } from '@views/MovieDetails/types'

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
  navigation: any
  withRate?: boolean
  movie: MovieDetails | SimilarMoviesResult
}

const MovieCard = ({ navigation, movie, withRate = false }: Props) => (
  <Card
    onPress={(): void =>
      navigation.push('MovieDetails', {
        movieId: movie.id,
      })
    }
  >
    <ImageWrapper>
      <Image
        src={{
          uri: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
        }}
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
    {withRate && (
      <RatingStar
        size="small"
        notation={movie?.vote_average ? movie?.vote_average / 2 : 0}
      />
    )}
  </Card>
)

export default MovieCard
