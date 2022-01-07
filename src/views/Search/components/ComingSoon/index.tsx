import React, { ReactElement } from 'react'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'

import ToTheMoon from '@assets/images/coming_soon/to_the_moon.png'

import { radius, spaces, ThemeAttributes } from '@src/styles/theme'

const Wrapper = styled.View`
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.RATING_US_CARD_BACKGROUND};
  padding-top: ${spaces.MEDIUM}px;
  padding-left: ${spaces.MEDIUM}px;
  padding-bottom: 0;
  padding-right: 0;
  border-radius: ${radius.LARGE}px;
  margin-top: ${spaces.X_LARGE}px;
`

const ImageWrapper = styled.View`
  margin-left: auto;
`

const ComingSoon = (): ReactElement => (
  <Wrapper>
    <Text size="HEADLINE_2" font="POPPINS_SEMI_BOLD" textAlign="left">
      Prochainement
    </Text>
    <Text textAlign="left" size="BODY_2" maxWidth={270}>
      Consulter une liste exaustive de série sur cette page.
    </Text>
    <ImageWrapper>
      <Image width={275} height={185} resizeMode="cover" src={ToTheMoon} />
    </ImageWrapper>
  </Wrapper>
)

export default ComingSoon
