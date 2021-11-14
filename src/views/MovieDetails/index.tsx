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

import VideoIcon from '@assets/icons/video.png'

import { spaces } from '@src/styles/theme'
import { getToken } from '@src/utils'
import MovieSpecs from './components/MovieSpecs'

import type { MovieDetailstype } from './types'

import {
  MoviePoster,
  VideoIconWrapper,
  GenderBadge,
  GenderBadgeWrapper,
  Resume,
  FavoriteButton,
  Rates,
} from './index.styles'
import ActorCard from './components/ActorCard'

export interface Props {
  navigation: NavigationContainerRef
  route: RouteProp<
    {
      params: {
        movieId: MovieDetailstype['movie']['id']
      }
    },
    'params'
  >
}

const MovieDetails = ({ navigation, route }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)
  const [liked, setLiked] = useState<boolean>(false)
  const [movieInfos, setMoviesInfos] = useState<MovieDetailstype>()
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true)
  const [movieResumeLimit, setMovieResumeLimit] = useState<number>(110)

  const isLiked = async () => {
    if (!token) return
    try {
      const { movieId } = route.params
      const showsLiked = await fetch(
        `http://api.movieapp.fr/shows?show_type=MOVIE&show_id=${movieId}`,
        {
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
            'x-access-tokens': token,
          },
          method: 'GET',
        }
      )
      const response = await showsLiked.json()
      if (response.success) setLiked(true)
    } catch (err) {
      console.log('Error', err)
    }
  }

  const handleSubmit = async () => {
    if (!token) return
    const { movieId } = route.params
    setIsSubmitting(true)
    await fetch(`http://api.movieapp.fr/shows/${movieId}?show_type=MOVIE`, {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'application/json',
        'x-access-tokens': token,
      },
      method: liked ? 'DELETE' : 'POST',
    })
      .then(() => setLiked(!liked))
      .finally(() => {
        setIsSubmitting(false)
      })
      .catch((err) => console.log('Error', err))
  }

  useEffect(() => {
    const { movieId } = route.params

    if (!movieId) {
      navigation.navigate('Movies')
    }
  }, [route.params.movieId])

  useEffect(() => {
    const receiveToken = async () => {
      setToken(await getToken())
    }
    receiveToken()
  }, [])

  useEffect(() => {
    const fetchMovieInfos = async () => {
      const { movieId } = route.params
      try {
        setIsDataFetching(true)
        const movieResponse = await fetch(
          `http://api.movieapp.fr/shows/${movieId}?show_type=MOVIE`
        )
        const moviesData = await movieResponse.json()
        setMoviesInfos(moviesData)
      } catch (err) {
        setShouldDisplayError(true)
      } finally {
        setIsDataFetching(false)
      }
    }
    fetchMovieInfos()
    isLiked()
  }, [token])

  if (isDataFetching || !movieInfos) return <Loader />

  if (shouldDisplayError) return <Error navigation={navigation} />

  const {
    trailer,
    poster,
    title,
    director,
    notes,
    genres,
    release_date,
    language,
    synopsis,
  } = movieInfos.movie

  return (
    <Layout
      headerOptions={{
        backIcon: {
          onPress: (): void => navigation.goBack(),
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
            src={{ uri: poster }}
          />
          <VideoIconWrapper intensity={100}>
            <TouchableOpacity
              onPress={(): void => {
                Linking.canOpenURL(`vnd.youtube://watch?v=${trailer}`).then(
                  (supported) => {
                    if (supported) {
                      return Linking.openURL(`vnd.youtube://watch?v=${trailer}`)
                    }
                    return Linking.openURL(
                      `https://www.youtube.com/watch?v=${trailer}`
                    )
                  }
                )
              }}
            >
              <Image src={VideoIcon} width={28} height={28} />
            </TouchableOpacity>
          </VideoIconWrapper>
        </MoviePoster>
        <Text font="POPPINS_SEMI_BOLD" size="BODY_1">
          {title}
        </Text>
        <Text size="BODY_1">{director}</Text>
        <Rates>
          <RatingStar notation={notes.mean} />
        </Rates>
        {genres.length > 0 && (
          <GenderBadgeWrapper>
            {genres.map((movieGender) => (
              <GenderBadge key={movieGender}>
                <Text size="OVERLINE">{movieGender}</Text>
              </GenderBadge>
            ))}
          </GenderBadgeWrapper>
        )}
        <MovieSpecs
          duration={movieInfos.movie.length}
          releaseDate={release_date}
          language={language}
        />
        {synopsis && (
          <Resume>
            <Text size="SUBTITLE" font="POPPINS_SEMI_BOLD" textAlign="left">
              Résumé
            </Text>
            <View style={{ marginBottom: spaces.XX_SMALL }} />
            <Text size="BODY_2" textAlign="left" limit={movieResumeLimit}>
              {synopsis}
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
          <Button
            disabled={isSubmitting}
            onPress={() =>
              !token ? navigation.navigate('Login') : handleSubmit()
            }
          >
            {!liked ? 'Ajouter aux favoris' : 'Retirer des favoris'}
          </Button>
        </FavoriteButton>
        <Text font="POPPINS_SEMI_BOLD" textAlign="left" size="SUBTITLE">
          Acteurs ({`${movieInfos.actors.length}`})
        </Text>
        {movieInfos.actors.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            horizontal
          >
            {movieInfos.actors.map((actor) => (
              <ActorCard {...actor} key={actor.name} />
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </Layout>
  )
}

export default MovieDetails
