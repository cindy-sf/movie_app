import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import type {
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native'
import { WebView as RNWebView } from 'react-native-webview'
import styled from 'styled-components/native'

import Layout from '@components/Layout'
import type { News } from '@views/Home/types'
import WebViewHeader from './component/WebviewHeader'

const WebView = styled(RNWebView)`
  width: ${({ width }: { width: string }) => width}px;
  height: ${({ height }: { height: string }) => height}px;
  flex: 1;
`

export interface Props {
  navigation: NavigationContainerRef
  route: RouteProp<
    {
      params: {
        selectedArticleUrl: News['url']
        selectedArticleTitle: News['title']
      }
    },
    'params'
  >
}

const ArticleDetails = ({ navigation, route }: Props) => {
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    const { selectedArticleUrl, selectedArticleTitle } = route.params

    if (!selectedArticleUrl || !selectedArticleTitle) {
      navigation.navigate('Home')
    }
  }, [route.params.selectedArticleUrl, route.params.selectedArticleTitle])

  return (
    <Layout
      customHeaderConfig={
        <WebViewHeader
          selectedArticleTitle={route.params.selectedArticleTitle}
          selectedArticleUrl={route.params.selectedArticleUrl}
          navigation={navigation}
        />
      }
    >
      <WebView
        width={width}
        height={height}
        source={{ uri: route.params.selectedArticleUrl }}
      />
    </Layout>
  )
}

export default ArticleDetails
