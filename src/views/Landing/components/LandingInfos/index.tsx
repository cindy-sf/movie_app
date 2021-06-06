import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

import { spaces } from '@styles/theme'
import Text from '@components/Text'
import type { Wording } from '@views/Landing/constants'

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
  display: flex;
  justify-content: center;
  align-content: flex-end;
`

export const ImageWrapper = styled.View`
  width: ${(props: { width: number }) => props.width}px;
  height: 270px;
  margin-bottom: ${spaces.XXX_LARGE}px;
`

export const LandingInfosWrapper = styled.View`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`

interface Props {
  landingInfos: Wording[]
  onScroll: () => void
  windowWidth: number
}

const LandingInfos = ({ onScroll, landingInfos, windowWidth }: Props) => (
  <ScrollView
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={onScroll}
    scrollEventThrottle={1}
  >
    {landingInfos.map((landingInfo) => (
      <LandingInfosWrapper key={landingInfo.step}>
        <Text font="POPPINS_SEMI_BOLD" size="BODY_1" maxWidth={250}>
          {landingInfo.description}
        </Text>
        <ImageWrapper width={windowWidth - spaces.MEDIUM * 2}>
          <Image source={landingInfo.image} />
        </ImageWrapper>
      </LandingInfosWrapper>
    ))}
  </ScrollView>
)

export default LandingInfos
