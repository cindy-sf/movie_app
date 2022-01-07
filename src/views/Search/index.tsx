import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import type {
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native'

import { MOVIE_DB_API_KEY } from '@src/credentials'

import Error from '@components/Error'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import MovieCard from '@components/MovieCard'
import MovieTypeTitle from '@components/MovieTypeTitle'

import type { MovieDetails } from '@src/types'

import ComingSoon from './components/ComingSoon'
import NoResult from './components/NoResult'

interface Props {
  navigation: NavigationContainerRef
  route: RouteProp<
    {
      params: {
        search: string
      }
    },
    'params'
  >
}

const Search = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState<string>(
    route.params.search || ''
  )
  const [searchResult, setSearchResult] = useState<MovieDetails[]>([])
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true)
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)

  useEffect(() => {
    const { search } = route.params

    if (search) {
      fetchMoviesBySearch(search)
    }
  }, [route.params.search])

  const fetchMoviesBySearch = async (search: string): Promise<void> => {
    try {
      setIsDataFetching(true)
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API_KEY}&language=fr-FR&query=${search}&page=1`
      )
      const searchData = await searchResponse.json()
      setSearchResult(searchData.results)
    } catch (error) {
      setShouldDisplayError(true)
    } finally {
      setIsDataFetching(false)
    }
  }

  const headerOptions = {
    backIcon: {
      onPress: (): void => navigation.goBack(),
    },
    searchBar: {
      onChangeText: (e: string): void => setSearchValue(e),
      value: searchValue,
      onSubmit: () => {
        navigation.navigate('Search', {
          search: searchValue,
        })
      },
    },
  }

  if (shouldDisplayError) {
    return <Error navigation={navigation} />
  }

  if (isDataFetching || !searchResult) {
    return <Loader headerOptions={headerOptions} />
  }

  if (searchResult.length === 0)
    return (
      <Layout headerOptions={headerOptions}>
        <NoResult search={route.params.search} />
      </Layout>
    )

  return (
    <Layout headerOptions={headerOptions}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <MovieTypeTitle onShowAllPress={() => {}} text="Films" />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            horizontal
            style={{ flexDirection: 'row' }}
          >
            {searchResult.map((result) => (
              <MovieCard
                key={result.id}
                movie={result}
                navigation={navigation}
              />
            ))}
          </ScrollView>
          <ComingSoon />
        </ScrollView>
      </ScrollView>
    </Layout>
  )
}

export default Search
