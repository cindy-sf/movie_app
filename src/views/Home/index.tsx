import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import type { NavigationContainerRef } from '@react-navigation/native'

import UserPicture from '@assets/images/user_pictures/girl_1.png'

import { spaces, ThemeAttributes } from '@src/styles/theme'

import Credits from '@components/Credits'
import Error from '@components/Error'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import Text from '@components/Text'

import { API_KEY } from '@src/credentials'
import SpotlightCard from './components/SpotlightCard'
import ArticleCard from './components/ArticleCard'

import WatchOption from './WatchOption'

import type { News } from './types'

const WatchOptionWrapper = styled.View`
  flex-direction: row;
  margin-top: ${spaces.SMALL}px;
  margin-bottom: ${spaces.XX_LARGE}px;
  margin-left: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.mode === 'light' ? `${spaces.XX_SMALL}px` : `${spaces.NONE}px`};
`

const Home = ({ navigation }: { navigation: NavigationContainerRef }) => {
  const [news, setNews] = useState<News[]>([])
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)
  const [isDataFetching, setIsDataFetching] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataFetching(true)
        const response = await fetch(
          `https://api.betaseries.com/news/last?key=${API_KEY}&limit=15`
        )
        const newsData = await response.json()

        setNews(newsData.news)
      } catch (err) {
        console.log('error', err)
        setShouldDisplayError(true)
      } finally {
        setIsDataFetching(false)
      }
    }

    fetchData()
  }, [])

  if (isDataFetching) {
    return <Loader />
  }

  if (shouldDisplayError) {
    return <Error navigation={navigation} />
  }

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
      <View style={{ flex: 3 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          style={{ marginTop: spaces.XX_LARGE }}
        >
          <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_2" textAlign="left">
            Je veux consulter...
          </Text>
          <WatchOptionWrapper>
            <WatchOption type="movie" onPress={() => {}} />
            <WatchOption type="tvShow" onPress={() => {}} />
          </WatchOptionWrapper>
          <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_2" textAlign="left">
            À la une
          </Text>
          {news.length > 0 && (
            <View>
              <SpotlightCard news={news[0]} />
              <View style={{ marginTop: spaces.LARGE }} />
              <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_2" textAlign="left">
                Actualité
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                horizontal
              >
                {news.slice(1).map((article: News) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </ScrollView>
              <Credits />
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  )
}

export default Home