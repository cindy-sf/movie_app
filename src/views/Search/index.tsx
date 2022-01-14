import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import type {
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native'

import { API_VERSION, MOVIE_DB_API_KEY } from '@src/credentials'

import Error from '@components/Error'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import MovieCard from '@components/MovieCard'
import MovieTypeTitle from '@components/MovieTypeTitle'

import type { PeopleType, MovieDetails } from '@src/types'

import PeopleCard from './components/PeopleCard'
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
  const [actorsResult, setActorsResult] = useState<PeopleType[]>([])

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
        `https://api.themoviedb.org/${API_VERSION}/search/movie?api_key=${MOVIE_DB_API_KEY}&query=${search}&language=fr`
      )
      const actorResponse = await fetch(
        `https://api.themoviedb.org/${API_VERSION}/search/person?api_key=${MOVIE_DB_API_KEY}&query=${search}&language=fr`
      )
      const searchData = await searchResponse.json()
      const actorData = await actorResponse.json()
      setSearchResult(searchData.results)
      setActorsResult(actorData.results)
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

  if (searchResult.length === 0 && actorsResult.length === 0)
    return (
      <Layout headerOptions={headerOptions}>
        <NoResult search={route.params.search} />
      </Layout>
    )

  return (
    <Layout headerOptions={headerOptions}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          {searchResult.length > 0 && (
            <>
              <MovieTypeTitle
                onShowAllPress={(): void => {
                  navigation.navigate('MoviesList', {
                    movieType: 'search',
                    searchQuery: route.params.search,
                  })
                }}
                text="Films"
              />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                horizontal
                style={{ flexDirection: 'row' }}
              >
                {searchResult.map((result) => (
                  <MovieCard key={result.id} movie={result} withRate />
                ))}
              </ScrollView>
            </>
          )}
          {actorsResult.length > 0 && (
            <>
              <MovieTypeTitle onShowAllPress={() => {}} text="Personnalité" />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                horizontal
                style={{ flexDirection: 'row' }}
              >
                {actorsResult.map((actor) => (
                  <PeopleCard key={actor.id} actor={actor} />
                ))}
              </ScrollView>
            </>
          )}
          <ComingSoon />
        </ScrollView>
      </ScrollView>
    </Layout>
  )
}

export default Search
