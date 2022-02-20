import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import {
  NavigationContainerRef,
  RouteProp,
  useNavigation,
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
import MovieCard from '@components/MovieCard'
import { MovieDetails as MovieDetailsType } from '@src/types'
import { API_VERSION, MOVIE_DB_API_KEY } from '@src/credentials'
import MovieSpecs from './components/MovieSpecs'

import type { Credits, SimilarMovies } from './types'

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
  route: RouteProp<
    {
      params: {
        movieId: MovieDetailsType['id']
      }
    },
    'params'
  >
}

interface MovieDetailsInfos {
  infos: MovieDetailsType
  credits: Credits
  similarMovies: SimilarMovies
}

function MovieDetails({ route }: Props) {
  const navigation = useNavigation()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)
  const [liked, setLiked] = useState<boolean>(false)
  const [movieInfos, setMoviesInfos] = useState<MovieDetailsInfos>()
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
      const urls = [
        `https://api.themoviedb.org/${API_VERSION}/movie/${movieId}?api_key=${MOVIE_DB_API_KEY}&language=fr`,
        `https://api.themoviedb.org/${API_VERSION}/movie/${movieId}/credits?api_key=${MOVIE_DB_API_KEY}&language=fr`,
        `https://api.themoviedb.org/${API_VERSION}/movie/${movieId}/similar?api_key=${MOVIE_DB_API_KEY}&language=fr`,
      ]

      try {
        setIsDataFetching(true)
        const data = await Promise.all(
          urls.map(async (url) => {
            const resp = await fetch(url)
            return resp.json()
          })
        )
        setMoviesInfos({
          infos: data[0],
          credits: data[1],
          similarMovies: data[2],
        })
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

  if (shouldDisplayError) return <Error />

  const {
    poster_path,
    original_language,
    original_title,
    vote_average,
    genres,
    release_date,
    overview,
    runtime,
  } = movieInfos.infos
  const { credits, similarMovies } = movieInfos

  const getDirector = () => {
    const director =
      credits && credits.crew.filter((credit) => credit.job === 'Director')[0]
    return director ? director.name : 'Inconnue'
  }

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
            src={{
              uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
            }}
          />
          <VideoIconWrapper intensity={100}>
            <Image src={VideoIcon} width={28} height={28} />
          </VideoIconWrapper>
        </MoviePoster>
        <Text font="POPPINS_SEMI_BOLD" size="BODY_1">
          {original_title}
        </Text>
        <Text size="BODY_1">{getDirector()}</Text>
        <Rates>
          <RatingStar notation={vote_average / 2} />
        </Rates>
        {genres.length > 0 && (
          <GenderBadgeWrapper>
            {genres.map((movieGenre: any) => (
              <GenderBadge key={movieGenre.id}>
                <Text size="OVERLINE">{movieGenre.name}</Text>
              </GenderBadge>
            ))}
          </GenderBadgeWrapper>
        )}
        <MovieSpecs
          duration={runtime}
          releaseDate={release_date}
          language={original_language}
        />
        {/* Resume */}
        {!!overview && (
          <Resume>
            <Text size="SUBTITLE" font="POPPINS_SEMI_BOLD" textAlign="left">
              Résumé
            </Text>
            <View style={{ marginBottom: spaces.XX_SMALL }} />
            <Text size="BODY_2" textAlign="left" limit={movieResumeLimit}>
              {overview}
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
        {/* Actors */}
        <Text font="POPPINS_SEMI_BOLD" textAlign="left" size="SUBTITLE">
          Acteurs ({`${credits?.cast.length || 0}`})
        </Text>
        {credits && credits.cast.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            horizontal
          >
            {credits?.cast.map((actor) => (
              <ActorCard
                picture={actor.profile_path}
                name={actor.name}
                role={actor.character}
                key={actor.name}
              />
            ))}
          </ScrollView>
        )}
        {/* Similar movies */}
        <View style={{ marginBottom: spaces.MEDIUM, marginTop: spaces.LARGE }}>
          <Text font="POPPINS_SEMI_BOLD" textAlign="left" size="SUBTITLE">
            Films similaires ({`${similarMovies?.results.length}`})
          </Text>
        </View>
        {similarMovies && similarMovies.results.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            horizontal
          >
            {similarMovies?.results.map((movie) => (
              <View key={movie.id} style={{ marginBottom: spaces.MEDIUM }}>
                <MovieCard movie={movie} withRate />
              </View>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </Layout>
  )
}

export default MovieDetails
