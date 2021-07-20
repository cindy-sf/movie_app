import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import type { ImageSourcePropType } from 'react-native'

import Image from '@components/Image'
import Text from '@components/Text'

import LanguageIcon from '@assets/icons/language_icon.png'
import MovieDurationIcon from '@assets/icons/movie_duration_icon.png'
import CalendarIcon from '@assets/icons/calendar_icon.png'

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

const Spec = ({ text, urlImage }: SpecProps) => (
  <MovieSpec>
    <Image src={urlImage} width={32} height={32} />
    <View style={{ marginTop: spaces.SMALL }} />
    <Text size="BODY_2">{`${text}`}</Text>
  </MovieSpec>
)

const MovieSpecs = ({ duration, language, releaseDate }: Props) => (
  <Wrapper>
    <Spec text={duration} urlImage={MovieDurationIcon} />
    <Spec text={releaseDate} urlImage={CalendarIcon} />
    <Spec text={language} urlImage={LanguageIcon} />
  </Wrapper>
)

export default MovieSpecs
