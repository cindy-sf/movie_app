import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { getInputRange, Wording } from '../../constants'

import { colors, spaces } from '$styles'

const DotsWrapper = styled.View`
  height: 10px;
  border-radius: 8px;
  margin-left: ${spaces.XX_SMALL}px;
  margin-right: ${spaces.XX_SMALL}px;
`

const StepIndicatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  align-self: center;
  bottom: 75px;
`

interface Props {
  landingInfos: Wording[]
  scrollX: Animated.Value
  windowWidth: number
}

const StepIndicator = ({ landingInfos, scrollX, windowWidth }: Props) => (
  <StepIndicatorContainer>
    {landingInfos.map((landingInfo, index) => {
      const width = scrollX.interpolate({
        inputRange: getInputRange(index, windowWidth),
        outputRange: [10, 25, 10],
        extrapolate: 'clamp',
      })

      const backgroundColor = scrollX.interpolate({
        inputRange: getInputRange(index, windowWidth),
        outputRange: [colors.GREY_MEDIUM, colors.BLUE, colors.GREY_MEDIUM],
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
  </StepIndicatorContainer>
)

export default StepIndicator
