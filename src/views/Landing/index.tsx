import React, { useRef } from 'react'

import { Alert, Animated, Button, useWindowDimensions } from 'react-native'

import { landingInfos } from './constants'
import Text from '../../components/Text'
import Layout from '../../components/Layout'
import StepIndicator from './components/StepIndicator'
import LandingInfos from './components/LandingInfos'

import { Container, ScrollContainer, Separator } from './index.styles'

const Landing = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const { width: windowWidth } = useWindowDimensions()

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    { useNativeDriver: false }
  )

  return (
    <Layout
      headerOptions={{
        closeIcon: { onClose: () => Alert.alert('Coming soon') },
      }}
    >
      <Separator>
        <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
          Bienvenue sur MovieApp
        </Text>
      </Separator>
      <Container>
        <ScrollContainer>
          <LandingInfos
            landingInfos={landingInfos}
            onScroll={onScroll}
            windowWidth={windowWidth}
          />
          <StepIndicator
            landingInfos={landingInfos}
            scrollX={scrollX}
            windowWidth={windowWidth}
          />
        </ScrollContainer>
      </Container>
      <Separator>
        <Button title="Incomming button" onPress={() => null} />
      </Separator>
    </Layout>
  )
}

export default Landing
