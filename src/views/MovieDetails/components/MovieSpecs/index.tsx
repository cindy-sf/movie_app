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
  duration: number | null
  language: string
  releaseDate: string
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

  const convertMovieDuration = (movieDuration: number | null): string => {
    if (!movieDuration || movieDuration === 0) return 'Inconnue'

    const minutes = movieDuration % 60
    const hour = Math.floor(movieDuration / 60)

    const convertedMinutes = minutes > 0 ? `${minutes}` : '00'

    return `${hour}h${convertedMinutes}`
  }

  return (
    <Wrapper>
      <Spec
        text={convertMovieDuration(duration)}
        urlImage={movieDurationIcon}
      />
      <Spec
        text={releaseDate.split('-').reverse().join('/')}
        urlImage={calendarIcon}
      />
      <Spec text={language} urlImage={languageIcon} />
    </Wrapper>
  )
}

export default MovieSpecs
