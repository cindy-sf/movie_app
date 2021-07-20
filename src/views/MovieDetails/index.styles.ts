import styled from 'styled-components/native'

import { BlurView } from 'expo-blur'

import { colors, radius, spaces, ThemeAttributes } from '@src/styles/theme'

export const FavoriteButton = styled.View`
  margin-top: ${spaces.X_LARGE}px;
  margin-bottom: ${spaces.XXX_LARGE}px;
`

export const GenderBadge = styled.View`
  background-color: ${colors.GREY_DARK};
  border-radius: ${radius.MEDIUM}px;
  padding: ${spaces.X_SMALL}px ${spaces.MEDIUM}px;
  margin-right: ${spaces.SMALL}px;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.INPUT_BACKGROUND};
  shadow-color: ${colors.GREY_LIGHT};
  shadow-offset: 0px 4px;
  shadow-radius: 4.65px;
  elevation: 7;
`

export const GenderBadgeWrapper = styled.View`
  flex-direction: row;
  margin-top: ${spaces.X_LARGE}px;
  justify-content: center;
`

export const MoviePoster = styled.View`
  border-radius: ${radius.MEDIUM}px;
  background-color: ${colors.PURPLE};
  margin-top: ${spaces.MEDIUM}px;
  margin-bottom: ${spaces.MEDIUM}px;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  width: 205px;
  height: 325px;
  position: relative;
`

export const Resume = styled.View`
  margin-top: ${spaces.XXX_LARGE}px;
`

export const VideoIconWrapper = styled(BlurView)`
  height: 52px;
  width: 52px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-top-left-radius: ${radius.MEDIUM}px;
  align-items: center;
  justify-content: center;
`
