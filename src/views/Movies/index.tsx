import React, { ReactElement, useEffect, useState } from 'react'
import { NavigationContainerRef, useIsFocused } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { View } from 'react-native'
import styled from 'styled-components/native'

import Error from '@components/Error'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import RatingUsCard from '@components/RatingUsCard'
import Text from '@components/Text'
import { spaces } from '@src/styles/theme'
import type { MovieDetails, MoviesGenre, SearchData } from '@src/types'
import MovieTypeTitle from '@components/MovieTypeTitle'
import MovieCard from '@components/MovieCard'
import { getToken } from '@src/utils'
import GenderCard from './components/GenderCard'

import { buildGenresMovieUrls, movieAPIUrls } from './constants'
import { selectRandomMoviesGenre } from './helpers'

const ScrollZone = styled.ScrollView`
  width: 100%;
`

interface Props {
  navigation: NavigationContainerRef
}

interface APIMovieList {
  show_id: number
  show_name: string
  show_tag: number
  show_type: string
  user_tag: string
}

interface MoviesList {
  upcoming: MovieDetails[]
  popular: MovieDetails[]
  byGenre: {
    selected: MoviesGenre['name'][]
    selectedIds: number[]
    list: MovieDetails[][]
  }
}

const Movies = ({ navigation }: Props): ReactElement => {
  const [movies, setMovies] = useState<MoviesList>()
  const isFocused = useIsFocused()
  const [moviesLiked, setMoviesLiked] = useState<SearchData[]>([])
  const [movieGenres, setMovieGenres] = useState<MoviesGenre[]>()
  const [searchValue, setSearchValue] = useState<string>('')
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true)
  const [shouldDisplayRating, setShouldDisplayRating] = useState<boolean>(true)
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)

  const scrollViewVerticalProps = {
    style: { marginBottom: spaces.MEDIUM },
    showsHorizontalScrollIndicator: false,
    overScrollMode: 'never',
    horizontal: true,
  } as const

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch popular and upcoming movies
        const data = await Promise.all(
          movieAPIUrls.map(async (url) => {
            const response = await fetch(url)
            return response.json()
          })
        )
        // fetch movies by random genres
        const randomMoviesGenres = selectRandomMoviesGenre(data[2].genres)
        const randomMoviesByGenderUrls = buildGenresMovieUrls(
          randomMoviesGenres.selectedGenresId
        )
        const randomMoviesByGenresData = await Promise.all(
          randomMoviesByGenderUrls.map(async (url) => {
            const response = await fetch(url)
            return response.json()
          })
        )

        setMovies({
          upcoming: data[0].results,
          popular: data[1].results,
          byGenre: {
            selected: randomMoviesGenres.selectedGenresNames,
            selectedIds: randomMoviesGenres.selectedGenresId,
            list: [
              randomMoviesByGenresData[0].results,
              randomMoviesByGenresData[1].results,
              randomMoviesByGenresData[2].results,
              randomMoviesByGenresData[3].results,
              randomMoviesByGenresData[4].results,
            ],
          },
        })
        setMovieGenres(data[2].genres)
      } catch (e) {
        setShouldDisplayError(true)
      } finally {
        setIsDataFetching(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchMoviesLike = async (): Promise<void> => {
      const token = await getToken()
      try {
        if (!token) return
        // Get movies liked by user
        setMoviesLiked(await getFavoritesShows(token))
      } catch (err) {
        setShouldDisplayError(true)
      }
    }
    fetchMoviesLike()
  }, [isFocused])

  const getFavoritesShows = async (token: string): Promise<SearchData[]> => {
    const moviesData: SearchData[] = []
    try {
      const showsLiked = await fetch(`http://api.movieapp.fr/shows`, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          'x-access-tokens': token,
        },
        method: 'GET',
      })
      const response = await showsLiked.json()
      if (response.success) {
        response.data.forEach((movie: APIMovieList) => {
          moviesData.push({
            id: movie.show_id,
            title: movie.show_name,
            poster: `https://pictures.betaseries.com/films/affiches/original/${movie.show_id}.jpg`,
          })
        })
      }
      return moviesData
    } catch (err) {
      console.log(err)
      return moviesData
    }
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
        displayUserPicture: true,
        searchBar: {
          onChangeText: (text): void => setSearchValue(text),
          onSubmit: (): void => {
            setSearchValue('')
            navigation.navigate('Search', {
              search: searchValue,
            })
          },
          value: searchValue,
        },
      }}
    >
      <ScrollZone showsVerticalScrollIndicator={false} overScrollMode="never">
        {/* Upcomming movies */}
        <MovieTypeTitle
          text="Prochaine sortie"
          onShowAllPress={(): void => {
            navigation.navigate('MoviesList', {
              movieType: 'upcoming',
            })
          }}
        />
        <ScrollView
          {...scrollViewVerticalProps}
          style={{ marginBottom: spaces.X_LARGE }}
        >
          {movies?.upcoming.map((movie) => (
            <MovieCard key={movie.id} movie={movie} withRate />
          ))}
        </ScrollView>
        {/* Rating us card */}
        {shouldDisplayRating && (
          <RatingUsCard onClose={(): void => setShouldDisplayRating(false)} />
        )}
        {/* Popular movies */}
        <MovieTypeTitle
          text="Film populaires"
          onShowAllPress={(): void => {
            navigation.navigate('MoviesList', {
              movieType: 'popular',
            })
          }}
        />
        <ScrollView {...scrollViewVerticalProps}>
          {movies?.popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} withRate />
          ))}
        </ScrollView>
        {/* Movies by genre */}
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          {movies?.byGenre.selected &&
            movies?.byGenre.selected.map((genre, index) => (
              <View key={genre} style={{ marginBottom: spaces.LARGE }}>
                <MovieTypeTitle
                  text={genre}
                  onShowAllPress={(): void => {
                    navigation.navigate('MoviesList', {
                      movieType: 'genre',
                      genreId: movies.byGenre.selectedIds[index],
                      genreName: genre,
                    })
                  }}
                />
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  overScrollMode="never"
                  horizontal
                >
                  {movies.byGenre.list[index].map((movie) => (
                    <MovieCard key={movie.id} movie={movie} withRate />
                  ))}
                </ScrollView>
              </View>
            ))}
        </ScrollView>
        {/* Movies by genre badges */}
        <Text textAlign="left" font="POPPINS_SEMI_BOLD" size="HEADLINE_2">
          Par catégories
        </Text>
        <ScrollView {...scrollViewVerticalProps}>
          {movieGenres?.length &&
            movieGenres.map((genre) => (
              <GenderCard
                key={genre.id}
                gender={genre.name}
                onPress={(): void => {
                  navigation.navigate('MoviesList', {
                    movieType: 'genre',
                    genreId: genre.id,
                    genreName: genre.name,
                  })
                }}
              />
            ))}
        </ScrollView>
        {/* Favorite movies */}
        {moviesLiked.length > 0 && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
          >
            <View style={{ marginBottom: spaces.MEDIUM }}>
              <MovieTypeTitle
                text="Films favoris"
                onShowAllPress={(): void => {}}
              />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                horizontal
              >
                {moviesLiked.map((movie) => (
                  <MovieCard key={movie.id} movie={movie as any} />
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        )}
      </ScrollZone>
    </Layout>
  )
}

export default Movies
