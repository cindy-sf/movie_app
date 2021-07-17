import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import Error from '@components/Error'
import Image from '@components/Image'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import Text from '@components/Text'

import UserPicture from '@assets/images/user_pictures/girl_1.png'

import { API_KEY } from '@src/credentials'
import { colors, radius, spaces } from '@src/styles/theme'

import type { Movie } from '@src/types'
import type { NavigationContainerRef } from '@react-navigation/native'

const ScrollZone = styled.ScrollView`
  margin-top: ${spaces.LARGE}px;
  width: 100%;
`

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: ${spaces.LARGE}px;
`

const MovieCard = styled.View`
  margin-right: ${spaces.X_LARGE}px;
`

const ImageWrapper = styled.View`
  border-radius: ${radius.LARGE}px;
  overflow: hidden;
  background-color: ${colors.PURPLE};
  margin-bottom: ${spaces.SMALL}px;
  height: 260px;
  width: 165px;
`

const Movies = ({ navigation }: { navigation: NavigationContainerRef }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isDataFetching, setIsDataFetching] = useState<boolean>(false)
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataFetching(true)
        const response = await fetch(
          `https://api.betaseries.com/movies/discover?key=${API_KEY}&type=popular&limit=15`
        )
        const moviesData = await response.json()
        const moviesWithPoster = moviesData.movies.map((movie: Movie) => ({
          ...movie,
          poster: `https://pictures.betaseries.com/films/affiches/original/${movie.id}.jpg`,
        }))
        setMovies(moviesWithPoster)
      } catch (err) {
        console.log('error', err)
        setShouldDisplayError(true)
      } finally {
        setIsDataFetching(false)
      }
    }

    fetchData()
  }, [])

  if (isDataFetching) return <Loader />

  if (shouldDisplayError) return <Error navigation={navigation} />

  return (
    <Layout
      headerOptions={{
        userPicture: {
          src: UserPicture,
          onPress: () => {},
        },
        searchBar: {
          onPress: () => {},
        },
      }}
    >
      <TitleWrapper>
        <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_2" textAlign="left">
          Films populaires
        </Text>
        <TouchableOpacity>
          <Text font="POPPINS_MEDIUM" size="BODY_2">
            Voir tout &gt;
          </Text>
        </TouchableOpacity>
      </TitleWrapper>
      <ScrollZone showsVerticalScrollIndicator={false} overScrollMode="never">
        <ScrollView
          style={{ marginBottom: spaces.X_LARGE }}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          horizontal
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id}>
              <ImageWrapper>
                <Image
                  src={{ uri: movie.poster }}
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
              >
                {movie.title.length > 35
                  ? `${movie.title.slice(0, 35)}...`
                  : movie.title}
              </Text>
            </MovieCard>
          ))}
        </ScrollView>
        <Text textAlign="left" font="POPPINS_SEMI_BOLD" size="SUBTITLE">
          Par catégories
        </Text>
      </ScrollZone>
    </Layout>
  )
}

export default Movies
