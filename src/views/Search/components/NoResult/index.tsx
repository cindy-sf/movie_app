import React, { ReactElement } from 'react'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'

import NoResultIllustration from '@assets/images/search/no_result.png'

import { spaces } from '@src/styles/theme'

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  margin-top: ${spaces.X_LARGE}px;
`

const ImageWrapper = styled.View`
  flex: 1;
  padding-top: ${spaces.XXX_LARGE}px;
`

const NoResult = ({ search }: { search: string }): ReactElement => (
  <Wrapper>
    <Text size="HEADLINE_2" font="POPPINS_SEMI_BOLD">
      Aucuns résultats pour “{search}”
    </Text>
    <ImageWrapper>
      <Image width={300} height={300} src={NoResultIllustration} />
    </ImageWrapper>
  </Wrapper>
)

export default NoResult
