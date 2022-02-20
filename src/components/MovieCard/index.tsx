import React, { ReactElement } from 'react'
import { View } from 'react-native'
import {
  StackActions,
  useNavigation,
  ParamListBase,
  TabActions,
} from '@react-navigation/native'
import type { MovieDetails } from '@src/types'
import styled from 'styled-components/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import Image from '@components/Image'
import Text from '@components/Text'
import RatingStar from '@components/RatingStar'

import { colors, radius, spaces } from '@src/styles/theme'

import type { SimilarMoviesResult } from '@views/MovieDetails/types'

const VerticalCard = styled.TouchableOpacity`
  margin-right: ${spaces.LARGE}px;
`

const HorizontalCard = styled.TouchableOpacity`
  margin-right: ${spaces.LARGE}px;
  flex-direction: row;
`

const ImageWrapper = styled.View`
  border-radius: ${radius.LARGE}px;
  overflow: hidden;
  background-color: ${colors.PURPLE};
  margin-bottom: ${spaces.SMALL}px;
`

interface Props {
  withRate?: boolean
  movie: MovieDetails | SimilarMoviesResult
  horizontal?: boolean
}

function MovieCard({
  movie,
  withRate = false,
  horizontal = false,
}: Props): ReactElement {
  const navigation = useNavigation<BottomTabNavigationProp<ParamListBase>>()
  const pushAction = TabActions.jumpTo('MovieDetails', {
    movieId: movie.id,
    index: 1,
    key: `movie-details--${movie.id}`,
  })

  if (horizontal) {
    return (
      <HorizontalCard onPress={(): void => navigation.dispatch(pushAction)}>
        <ImageWrapper>
          <Image
            src={{
              uri: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
            }}
            height={220}
            width={150}
            resizeMode="cover"
          />
        </ImageWrapper>
        <View style={{ marginLeft: spaces.MEDIUM, paddingTop: spaces.MEDIUM }}>
          <Text
            font="POPPINS_SEMI_BOLD"
            textAlign="left"
            size="BODY_1"
            maxWidth={165}
            numberOfLines={2}
          >
            {movie.title}
          </Text>
          <Text size="OVERLINE" textAlign="left" font="POPPINS_ITALIC">
            {movie.release_date
              ? `Sortie le ${movie.release_date.split('-').reverse().join('/')}`
              : 'Date de sortie inconnue'}
          </Text>
          <View style={{ marginTop: spaces.XX_SMALL }} />
          <RatingStar
            size="small"
            notation={movie?.vote_average ? Number(movie?.vote_average) / 2 : 0}
          />
          <View style={{ marginTop: spaces.LARGE }}>
            <Text size="BODY_2" textAlign="left" maxWidth={150}>
              Romance, Drame, Science-Fiction
            </Text>
          </View>
          <View style={{ marginTop: spaces.LARGE }} />
        </View>
      </HorizontalCard>
    )
  }

  return (
    <VerticalCard onPress={(): void => navigation.dispatch(pushAction)}>
      {/* // <VerticalCard
    //   onPress={(): void =>
    //     navigation.navigate('MovieDetails', {
    //       movieId: movie.id,
    //       index: 1,
    //       key: `movie-details--${movie.id}`,
    //     })
    //   }
    // > */}
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
          notation={movie?.vote_average ? Number(movie?.vote_average) / 2 : 0}
        />
      )}
    </VerticalCard>
  )
}

export default MovieCard
