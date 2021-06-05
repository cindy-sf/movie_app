import React, { useRef, useEffect } from 'react'

import {
  ScrollView,
  View,
  Animated,
  useWindowDimensions,
  Text,
  Button,
} from 'react-native'
import { storeAppTheme } from '../../utils'

import ManWithBalloons from '../../assets/images/landing/man_with_balloons.png'
import ManWithLaptop from '../../assets/images/landing/man_with_laptop.png'
import ManWithOculus from '../../assets/images/landing/man_with_oculus.png'
import WalkingGirl from '../../assets/images/landing/walking_girl.png'
import { colors, fonts, spaces } from '$styles'

import {
  Container,
  DotsWrapper,
  Layout,
  Image,
  ImageWrapper,
  IndicatorContainer,
  ScrollContainer,
  Title,
} from './index.styles'

interface Wording {
  step: number
  image: string
  description: string
}

const landingInfos: Wording[] = [
  {
    step: 1,
    image: ManWithLaptop,
    description: 'Suivez vos séries et vos films préférés',
  },
  {
    step: 2,
    image: ManWithOculus,
    description: 'Partagez vos séries préférés à vos amis',
  },
  {
    step: 3,
    image: WalkingGirl,
    description: 'Gardez le fil des films et séries tendances',
  },
  {
    step: 4,
    image: ManWithBalloons,
    description: '100% gratuit, 100% sans pub, 100% MovieApp. ',
  },
]

const Landing = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  useEffect(() => {
    storeAppTheme('dark')
  }, [])

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
      <View
        style={{
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title>Bienvenue sur MovieApp</Title>
      </View>
      <Container>
        <ScrollContainer>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={1}
          >
            {landingInfos.map((landingInfo) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                key={landingInfo.step}
              >
                <Text
                  style={{
                    color: '#fff',
                    width: windowWidth - spaces.MEDIUM * 2,
                    textAlign: 'center',
                    fontFamily: fonts.POPPINS_SEMI_BOLD,
                    fontSize: 16,
                    maxWidth: 250,
                  }}
                >
                  {landingInfo.description}
                </Text>
                <ImageWrapper width={windowWidth - spaces.MEDIUM * 2}>
                  <Image source={landingInfo.image} />
                </ImageWrapper>
              </View>
            ))}
          </ScrollView>
          <IndicatorContainer>
            {landingInfos.map((landingInfo, index) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (index - 1),
                  windowWidth * index,
                  windowWidth * (index + 1),
                ],
                outputRange: [10, 25, 10],
                extrapolate: 'clamp',
              })
              const backgroundColor = scrollX.interpolate({
                inputRange: [
                  windowWidth * (index - 1),
                  windowWidth * index,
                  windowWidth * (index + 1),
                ],
                outputRange: [
                  colors.GREY_MEDIUM,
                  colors.BLUE,
                  colors.GREY_MEDIUM,
                ],
                extrapolate: 'clamp',
              })
              return (
                <DotsWrapper
                  key={landingInfo.step}
                  as={Animated.View}
                  backgroundColor={backgroundColor}
                  width={width}
                />
              )
            })}
          </IndicatorContainer>
        </ScrollContainer>
      </Container>
      <View style={{ flex: 0.5 }} />
    </Layout>
  )
}

export default Landing
