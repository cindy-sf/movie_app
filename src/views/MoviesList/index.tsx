import React, { ReactElement, useEffect, useState } from 'react'
import { NativeScrollEvent, ScrollView, View } from 'react-native'
import type {
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native'

import { API_VERSION, MOVIE_DB_API_KEY } from '@src/credentials'

import Error from '@components/Error'
import Image from '@components/Image'
import MovieCard from '@components/MovieCard'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import RatingUsCard from '@components/RatingUsCard'
import Text from '@components/Text'

import type { MovieDetails } from '@src/types'
import { spaces } from '@src/styles/theme'
import { gendersIcon } from '@src/views/Movies/components/GenderCard/constants'

interface Props {
  navigation: NavigationContainerRef
  route: RouteProp<
    {
      params: {
        movieType: 'popular' | 'upcoming' | 'genre' | 'search'
        genreId?: number
        genreName?: string
        searchQuery?: string
      }
    },
    'params'
  >
}

const MoviesList = ({ navigation, route }: Props) => {
  const [moviesList, setMoviesList] = useState<MovieDetails[]>([])
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true)
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)
  const [isFetchingNewMovies, setIsFetchingNewMovies] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  let url = ''
  let pageTitle: string | ReactElement = ''

  switch (route.params.movieType) {
    case 'popular':
      pageTitle = 'Films populaires'
      url = `https://api.themoviedb.org/${API_VERSION}/movie/popular?api_key=${MOVIE_DB_API_KEY}&language=fr`
      break

    case 'upcoming':
      pageTitle = 'Prochaine sorties'
      url = `https://api.themoviedb.org/${API_VERSION}/movie/upcoming?api_key=${MOVIE_DB_API_KEY}&language=fr`
      break

    case 'search':
      if (!route.params.searchQuery) break
      pageTitle = route.params.searchQuery
      url = `https://api.themoviedb.org/${API_VERSION}/search/movie?api_key=${MOVIE_DB_API_KEY}&query=${route.params.searchQuery}&language=fr`
      break

    case 'genre':
      if (!route.params.genreName) break
      pageTitle = (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text size="HEADLINE_2" font="POPPINS_SEMI_BOLD">
            {route.params.genreName}
          </Text>
          <View style={{ marginLeft: spaces.X_SMALL }}>
            <Image
              width={24}
              height={24}
              src={
                gendersIcon[route.params.genreName] || gendersIcon.UnknowGender
              }
            />
          </View>
        </View>
      )
      url = `https://api.themoviedb.org/${API_VERSION}/discover/movie?api_key=${MOVIE_DB_API_KEY}&with_genres=${route.params.genreId}&language=fr`
      break

    default:
      break
  }

  useEffect(() => {
    fetchData(page)
  }, [])

  const fetchData = async (pageNumber: number): Promise<void> => {
    if (!url) return

    try {
      if (pageNumber === 1) {
        setIsDataFetching(true)
      }
      const response = await fetch(`${url}&page=${pageNumber}`)
      const data = await response.json()
      setMoviesList([...moviesList, ...data.results])
    } catch (err) {
      console.log('error', err)
      setShouldDisplayError(true)
    } finally {
      setIsDataFetching(false)
    }
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 10
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  if (isDataFetching) {
    return <Loader />
  }

  if (shouldDisplayError) {
    return <Error navigation={navigation} />
  }

  return (
    <Layout
      headerOptions={{
        backIcon: {
          onPress: (): void => navigation.goBack(),
        },
        pageTitle,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        style={{
          width: '100%',
          paddingTop: spaces.MEDIUM,
        }}
        onScroll={async ({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setIsFetchingNewMovies(true)
            setPage(page + 1)
            await fetchData(page + 1)
            setIsFetchingNewMovies(false)
          }
        }}
        scrollEventThrottle={400}
      >
        {moviesList.map((movie, index) => (
          <View
            key={movie.id}
            style={{
              marginBottom: spaces.MEDIUM,
            }}
          >
            {index === 2 ? (
              <RatingUsCard onClose={(): void => {}} />
            ) : (
              <MovieCard movie={movie} horizontal />
            )}
          </View>
        ))}
        {isFetchingNewMovies && <Loader variant="minimized" />}
      </ScrollView>
    </Layout>
  )
}

export default MoviesList
