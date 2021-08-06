import React from 'react'
import styled from 'styled-components/native'

import Image from '@components/Image'

import FullStar from '@assets/icons/full_star_icon.png'
import MidStarWhite from '@assets/icons/mid_star_icon_white.png'
import MidStarBlack from '@assets/icons/mid_star_icon_black.png'
import UnStarWhite from '@assets/icons/unstar_icon_white.png'
import UnStarBlack from '@assets/icons/unstar_icon_black.png'

import { spaces, ThemeAttributes } from '@src/styles/theme'
import { useSelector } from 'react-redux'
import { ImageSourcePropType } from 'react-native'

const RatingWrapper = styled.View`
  flex-direction: row;
`

const Star = styled.View`
  margin-right: ${spaces.XX_SMALL}px;
`

const RatingStar = ({ notation }: { notation: number }) => {
  const score = Math.round(notation * 2) / 2
  const stars: ImageSourcePropType[] = []
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const fillArray = (nb: number, elem: ImageSourcePropType) => {
    for (let i = 0; i < nb; i += 1) stars.push(elem)
  }
  fillArray(Math.floor(score), FullStar)
  fillArray(
    score - Math.floor(score) !== 0 ? 1 : 0,
    appTheme === 'light' ? MidStarWhite : MidStarBlack
  )
  fillArray(
    Math.floor(5 - score),
    appTheme === 'light' ? UnStarWhite : UnStarBlack
  )
  return (
    <RatingWrapper>
      {stars.map((item: ImageSourcePropType, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <Star key={index}>
          <Image src={item} width={20} height={20} />
        </Star>
      ))}
    </RatingWrapper>
  )
}

export default RatingStar
