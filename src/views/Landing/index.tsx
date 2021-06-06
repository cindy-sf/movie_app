import React, { useRef } from 'react'

import { Alert, Animated, useWindowDimensions } from 'react-native'
import Layout from '@components/Layout'
import Text from '@components/Text'
import Button from '@components/Button'
import { Container, ScrollContainer, Separator } from './index.styles'
import { landingInfos } from './constants'
import StepIndicator from './components/StepIndicator'
import LandingInfos from './components/LandingInfos'

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
        <Button>Démarrer</Button>
      </Separator>
    </Layout>
  )
}

export default Landing
