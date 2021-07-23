import React, { useEffect, useState } from 'react'
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native'
import type {
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native'

import Button from '@components/Button'
import Error from '@components/Error'
import Image from '@components/Image'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import RatingStar from '@components/RatingStar'
import Text from '@components/Text'

import { API_KEY } from '@src/credentials'

import VideoIcon from '@assets/icons/video.png'

import { spaces } from '@src/styles/theme'
import MovieSpecs from './components/MovieSpecs'

import type { MovieCharacters, MovieDetailstype } from './types'

import {
  MoviePoster,
  VideoIconWrapper,
  GenderBadge,
  GenderBadgeWrapper,
  Resume,
  FavoriteButton,
  Rates,
} from './index.styles'

export interface Props {
  navigation: NavigationContainerRef
  route: RouteProp<
    {
      params: {
        movieId: MovieDetailstype['id']
      }
    },
    'params'
  >
}

const MovieDetails = ({ navigation, route }: Props) => {
  const [movieInfos, setMoviesInfos] = useState<MovieDetailstype>()
  const [movieCharacters, setMoviesCharacters] = useState<MovieCharacters[]>()
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)
  const [isDataFetching, setIsDataFetching] = useState<boolean>(false)
  const [movieResumeLimit, setMovieResumeLimit] = useState<number>(110)

  useEffect(() => {
    const { movieId } = route.params

    if (!movieId) {
      navigation.navigate('Movies')
    }
  }, [route.params.movieId])

  useEffect(() => {
    const fetchMovieInfos = async () => {
      const { movieId } = route.params
      try {
        setIsDataFetching(true)
        const movieResponse = await fetch(
          `https://api.betaseries.com/movies/movie?key=${API_KEY}&id=${movieId}`
        )
        const actorResponse = await fetch(
          `https://api.betaseries.com/movies/characters?key=${API_KEY}&id=${movieId}`
        )

        const moviesData = await movieResponse.json()
        const actorData = await actorResponse.json()

        setMoviesInfos(moviesData.movie)
        setMoviesCharacters(actorData.characters)
      } catch (err) {
        setShouldDisplayError(true)
      } finally {
        setIsDataFetching(false)
      }
    }

    fetchMovieInfos()
  }, [])

  if (isDataFetching || !movieInfos || !movieCharacters) return <Loader />

  if (shouldDisplayError) return <Error navigation={navigation} />

  return (
    <Layout
      headerOptions={{
        backIcon: {
          onPress: (): void => navigation.navigate('Movies'),
        },
        shareAction: {
          onPress: (): void => {},
        },
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <MoviePoster>
          <Image
            width={205}
            height={325}
            resizeMode="cover"
            src={{ uri: movieInfos.poster }}
          />
          <VideoIconWrapper intensity={100}>
            <TouchableOpacity
              onPress={(): void => {
                Linking.canOpenURL(
                  `vnd.youtube://watch?v=${movieInfos.trailer}`
                ).then((supported) => {
                  if (supported) {
                    return Linking.openURL(
                      `vnd.youtube://watch?v=${movieInfos.trailer}`
                    )
                  }
                  return Linking.openURL(
                    `https://www.youtube.com/watch?v=${movieInfos.trailer}`
                  )
                })
              }}
            >
              <Image src={VideoIcon} width={28} height={28} />
            </TouchableOpacity>
          </VideoIconWrapper>
        </MoviePoster>
        <Text font="POPPINS_SEMI_BOLD" size="BODY_1">
          {movieInfos.title}
        </Text>
        <Text size="BODY_1">{movieInfos.director}</Text>
        <Rates>
          <RatingStar notation={movieInfos.notes.mean} />
        </Rates>
        {movieInfos.genres.length > 0 && (
          <GenderBadgeWrapper>
            {movieInfos.genres.map((movieGender) => (
              <GenderBadge key={movieGender}>
                <Text size="OVERLINE">{movieGender}</Text>
              </GenderBadge>
            ))}
          </GenderBadgeWrapper>
        )}
        <MovieSpecs
          duration={movieInfos.length}
          releaseDate={movieInfos.release_date}
          language={movieInfos.language}
        />
        {movieInfos.synopsis && (
          <Resume>
            <Text size="SUBTITLE" font="POPPINS_SEMI_BOLD" textAlign="left">
              Résumé
            </Text>
            <View style={{ marginBottom: spaces.XX_SMALL }} />
            <Text size="BODY_2" textAlign="left" limit={movieResumeLimit}>
              {movieInfos.synopsis}
            </Text>
            {movieResumeLimit > 0 && (
              <TouchableOpacity onPress={(): void => setMovieResumeLimit(0)}>
                <Text
                  textAlign="left"
                  font="POPPINS_BOLD"
                  size="BODY_2"
                  textDecoration="underline"
                >
                  Lire la suite
                </Text>
              </TouchableOpacity>
            )}
          </Resume>
        )}
        <FavoriteButton>
          <Button>Ajouter en favoris</Button>
        </FavoriteButton>
        <Text font="POPPINS_SEMI_BOLD" textAlign="left" size="SUBTITLE">
          Acteurs ({`${movieCharacters.length}`})
        </Text>
      </ScrollView>
    </Layout>
  )
}

export default MovieDetails
