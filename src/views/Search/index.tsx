import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import type {
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native'

import { API_KEY } from '@src/credentials'

import Error from '@components/Error'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import MovieCard from '@components/MovieCard'
import MovieTypeTitle from '@components/MovieTypeTitle'

import type { SearchData } from '@src/types'

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
  const [searchResult, setSearchResult] = useState<SearchData[]>([])
  const [isDataFetching, setIsDataFetching] = useState<boolean>(false)
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)

  useEffect(() => {
    const { search } = route.params

    if (search) {
      fetchMoviesBySearch(search)
    }
  }, [])

  const fetchMoviesBySearch = async (search: string): Promise<void> => {
    try {
      setIsDataFetching(true)
      const searchResponse = await fetch(
        `https://api.betaseries.com/search/movies?key=${API_KEY}&text=${search}&limit=10`
      )
      const searchData = await searchResponse.json()
      setSearchResult(searchData.movies)
    } catch (error) {
      setShouldDisplayError(error)
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
      onSubmit: (): Promise<void> => fetchMoviesBySearch(searchValue),
    },
  }

  if (shouldDisplayError) {
    return <Error navigation={navigation} />
  }

  if (isDataFetching || !searchResult) {
    return <Loader headerOptions={headerOptions} />
  }

  return (
    <Layout headerOptions={headerOptions}>
      <View>
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
        </ScrollView>
      </View>
    </Layout>
  )
}

export default Search
