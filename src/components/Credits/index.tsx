import React from 'react'
import styled from 'styled-components/native'

import { spaces } from '@src/styles/theme'

import Text from '@components/Text'

const CreditsWrapper = styled.View`
  padding: ${spaces.SMALL}px;
  margin-top: ${spaces.XXX_LARGE}px;
`

const Credits = () => (
  <CreditsWrapper>
    <Text size="BODY_2" font="POPPINS_ITALIC">
      Powered by St Fleurant Team
    </Text>
  </CreditsWrapper>
)

export default Credits
