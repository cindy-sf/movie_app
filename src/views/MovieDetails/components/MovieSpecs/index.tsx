import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
import styled from 'styled-components/native'
import type { ImageSourcePropType } from 'react-native'

import Image from '@components/Image'
import Text from '@components/Text'

import LanguageIconWhite from '@assets/icons/language_icon_white.png'
import MovieDurationIconWhite from '@assets/icons/movie_duration_icon_white.png'
import CalendarIconWhite from '@assets/icons/calendar_icon_white.png'
import LanguageIconBlack from '@assets/icons/language_icon_black.png'
import MovieDurationIconBlack from '@assets/icons/movie_duration_icon_black.png'
import CalendarIconBlack from '@assets/icons/calendar_icon_black.png'

import type { ThemeAttributes } from '@styles/theme'

import { spaces } from '@src/styles/theme'

const MovieSpec = styled.View`
  align-items: center;
`

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spaces.XX_LARGE}px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
`

interface Props {
  duration: number
  language: string
  releaseDate: number
}

interface SpecProps {
  text: string | number
  urlImage: ImageSourcePropType
}

const Spec = ({ text, urlImage }: SpecProps): ReactElement => (
  <MovieSpec>
    <Image src={urlImage} width={32} height={32} />
    <View style={{ marginTop: spaces.SMALL }} />
    <Text size="BODY_2">{`${text}`}</Text>
  </MovieSpec>
)

const MovieSpecs = ({
  duration,
  language,
  releaseDate,
}: Props): ReactElement => {
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const movieDurationIcon =
    appTheme === 'light' ? MovieDurationIconBlack : MovieDurationIconWhite
  const calendarIcon =
    appTheme === 'light' ? CalendarIconBlack : CalendarIconWhite
  const languageIcon =
    appTheme === 'light' ? LanguageIconBlack : LanguageIconWhite

  const convertMovieLength = (movieLength: number): string => {
    if (duration === 0) return 'Inconnue'

    const secondsInHour = Math.floor(movieLength / 3600)
    const secondsInMinutes = Math.floor((movieLength % 3600) / 60)

    const hour = secondsInHour > 0 ? `${secondsInHour}h` : '00h'
    const minutes = secondsInMinutes > 0 ? `${secondsInMinutes}` : '00'

    return hour + minutes
  }

  const getMovieReleaseDate = (movieReleaseDate: number): string => {
    const date = new Date(movieReleaseDate)
    const year = date.getFullYear()
    const mounth =
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()

    return `${day}/${mounth}/${year}`
  }

  return (
    <Wrapper>
      <Spec text={convertMovieLength(duration)} urlImage={movieDurationIcon} />
      <Spec text={getMovieReleaseDate(releaseDate)} urlImage={calendarIcon} />
      <Spec text={language} urlImage={languageIcon} />
    </Wrapper>
  )
}

export default MovieSpecs
