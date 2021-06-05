import React, { useRef } from 'react'

import { Animated, Button, useWindowDimensions } from 'react-native'

import { landingInfos } from './constants'
import Text from '../../components/Text'
import StepIndicator from './components/StepIndicator'
import LandingInfos from './components/LandingInfos'

import { Container, Layout, ScrollContainer, Separator } from './index.styles'

const Landing = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

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
    <Layout width={windowWidth} minHeight={windowHeight}>
      <Separator>
        <Text>Soon, header</Text>
      </Separator>
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
