import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import MovieIconWhite from '@assets/icons/movie_icon_white.png'
import TVShowIconWhite from '@assets/icons/tv_show_icon_white.png'
import MovieIconBlack from '@assets/icons/movie_icon_black.png'
import TVShowIconBlack from '@assets/icons/tv_show_icon_black.png'

import Text from '@components/Text'
import Image from '@components/Image'

import { colors, radius, spaces, ThemeAttributes } from '@src/styles/theme'

const WatchOptionContent = styled.TouchableOpacity`
  width: 122px;
  height: 87px;
  padding-top: ${spaces.MEDIUM}px;
  padding-bottom: ${spaces.MEDIUM}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.INPUT_BACKGROUND};
  border-radius: ${radius.LARGE}px;
  margin-right: ${spaces.MEDIUM}px;
  shadow-color: ${colors.BLACK};
  shadow-offset: 0px 4px;
  shadow-radius: 4.65px;
  elevation: 7;
`

interface Props {
  type: 'movie' | 'tvShow'
  onPress: () => void
}

const WatchOption = ({ type, onPress }: Props) => {
  const themeColor = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const movieIcon = themeColor === 'light' ? MovieIconBlack : MovieIconWhite
  const tvShowIcon = themeColor === 'light' ? TVShowIconBlack : TVShowIconWhite

  return (
    <WatchOptionContent onPresse={onPress}>
      <Image
        width={22}
        height={22}
        src={type === 'movie' ? movieIcon : tvShowIcon}
        resizeMode="cover"
      />
      <View style={{ marginBottom: spaces.X_SMALL }} />
      <Text font="POPPINS_REGULAR" size="OVERLINE">
        {type === 'movie' ? 'Films' : 'Séries'}
      </Text>
    </WatchOptionContent>
  )
}

export default WatchOption
