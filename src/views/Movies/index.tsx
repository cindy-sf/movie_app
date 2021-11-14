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
import type { Movie, SearchData } from '@src/types'
import MovieTypeTitle from '@components/MovieTypeTitle'
import MovieCard from '@components/MovieCard'
import { getToken } from '@src/utils'
import GenderCard from './components/GenderCard'

import { buildGenderMovieUrls, movieAPIUrls } from './constants'

const ScrollZone = styled.ScrollView`
  width: 100%;
`

interface Props {
  navigation: NavigationContainerRef
}

interface MovieList {
  incomingMovies: Movie[]
  popularMovies: Movie[]
  randomMoviesByGender: Movie[][]
}

interface APIMovieList {
  show_id: number
  show_name: string
  show_tag: number
  show_type: string
  user_tag: string
}

const Movies = ({ navigation }: Props): ReactElement => {
  const [movies, setMovies] = useState<MovieList>({
    incomingMovies: [],
    popularMovies: [],
    randomMoviesByGender: [],
  })
  const isFocused = useIsFocused()
  const [moviesLiked, setMoviesLiked] = useState<SearchData[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [moviesGender, setMoviesGender] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [dynamicMoviesGenders, setDynamicMoviesGenders] = useState<string[]>([])
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true)
  const [shouldDisplayRating, setShouldDisplayRating] = useState<boolean>(true)
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)

  useEffect(() => {
    const fetchMoviesLike = async (): Promise<void> => {
      try {
        // Get movies liked by user
        setMoviesLiked(await getFavoritesShows())
      } catch (err) {
        setShouldDisplayError(true)
      }
    }
    fetchMoviesLike()
  }, [token, isFocused])

  useEffect(() => {
    const receiveToken = async () => {
      setToken(await getToken())
    }

    const fetchData = async (): Promise<void> => {
      try {
        setIsDataFetching(true)

        // Get movies list and all genders
        const data = await Promise.all(
          movieAPIUrls.map(async (url) => {
            const response = await fetch(url)
            return response.json()
          })
        )

        // Generate random movies genders
        const randomMoviesGenders = getRandomMoviesGender(
          Object.keys(data[2].genres)
        )
        const randomMoviesByGenderUrls =
          buildGenderMovieUrls(randomMoviesGenders)

        const randomMoviesByGenderData = await Promise.all(
          randomMoviesByGenderUrls.map(async (url) => {
            const response = await fetch(url)
            return response.json()
          })
        )

        // Set data
        setMovies({
          incomingMovies: moviesWithPoster(data[1].movies),
          popularMovies: moviesWithPoster(data[0].movies),
          randomMoviesByGender: [
            randomMoviesByGenderData[0].movies,
            randomMoviesByGenderData[1].movies,
            randomMoviesByGenderData[2].movies,
            randomMoviesByGenderData[3].movies,
            randomMoviesByGenderData[4].movies,
          ],
        })
        setMoviesGender(data[2].genres)
        setDynamicMoviesGenders(randomMoviesGenders)
      } catch (err) {
        setShouldDisplayError(true)
      } finally {
        setIsDataFetching(false)
      }
    }

    fetchData()
    receiveToken()
  }, [])

  const getFavoritesShows = async (): Promise<SearchData[]> => {
    const moviesData: SearchData[] = []
    if (!token) return moviesData
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

  const getRandomMoviesGender = (gendersList: string[]): string[] => {
    const selectedGenders: string[] = []

    while (selectedGenders.length !== 5) {
      const randomIndex = Math.floor(Math.random() * gendersList.length)

      if (!selectedGenders.includes(gendersList[randomIndex])) {
        selectedGenders.push(gendersList[randomIndex])
      }
    }

    return selectedGenders
  }

  const moviesWithPoster = (movieList: Movie[]): Movie[] =>
    movieList.map((movie) => ({
      ...movie,
      poster: `https://pictures.betaseries.com/films/affiches/original/${movie.id}.jpg`,
    }))

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
        <MovieTypeTitle
          text="Films populaires"
          onShowAllPress={(): void => {}}
        />
        <ScrollView
          style={{ marginBottom: spaces.MEDIUM }}
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal
        >
          {movies.popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} navigation={navigation} />
          ))}
        </ScrollView>
        {shouldDisplayRating && (
          <RatingUsCard
            onClose={(): void => {
              setShouldDisplayRating(false)
            }}
          />
        )}
        <MovieTypeTitle
          text="Prochaine sortie"
          onShowAllPress={(): void => {}}
        />
        <ScrollView
          style={{ marginBottom: spaces.MEDIUM }}
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal
        >
          {movies.incomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} navigation={navigation} />
          ))}
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          {dynamicMoviesGenders.map((gender, index) => (
            <View key={gender} style={{ marginBottom: spaces.MEDIUM }}>
              <MovieTypeTitle text={gender} onShowAllPress={(): void => {}} />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                horizontal
              >
                {movies.randomMoviesByGender[index].map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    navigation={navigation}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
        <Text textAlign="left" font="POPPINS_SEMI_BOLD" size="HEADLINE_2">
          Par catégories
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal
        >
          {Object.keys(moviesGender).map((gender) => (
            <GenderCard key={gender} gender={gender} onPress={(): void => {}} />
          ))}
        </ScrollView>
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
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    navigation={navigation}
                  />
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
