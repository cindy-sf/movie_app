import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

import { spaces } from '@styles/theme'
import Text from '@components/Text'
import Image from '@components/Image'
import type { Wording } from '@views/Landing/constants'

export const ImageWrapper = styled.View`
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
        <ImageWrapper>
          <Image
            height={270}
            width={windowWidth - spaces.MEDIUM * 2}
            src={landingInfo.image}
          />
        </ImageWrapper>
      </LandingInfosWrapper>
    ))}
  </ScrollView>
)

export default LandingInfos
