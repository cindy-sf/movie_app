import React from 'react'
import styled from 'styled-components/native'

import Image from '@components/Image'

import FullStar from '@assets/icons/full_star_icon.png'
import MidStar from '@assets/icons/mid_star_icon.png'
import UnStar from '@assets/icons/unstar_icon.png'

import { spaces } from '@src/styles/theme'

const RatingWrapper = styled.View`
  flex-direction: row;
`

const Star = styled.View`
  margin-right: ${spaces.XX_SMALL}px;
`

const RatingStar = ({ notation }: { notation: number }) => {
  // @todo: adding logic for stars display
  return (
    <RatingWrapper>
      {[0, 1, 2, 3, 4].map((item, index) => (
        <Star key={index}>
          <Image
            src={FullStar}
            width={20}
            height={20}
          />
        </Star>
      ))}
    </RatingWrapper>
  )
}

export default RatingStar
