import React from 'react'

import Image from '@components/Image'
import Text from '@components/Text'

import Button from '@components/Button'
import CloseIconWhite from '@assets/icons/close_icon_white.png'
import ThumbUp from '@assets/images/movies/thumb_up.png'

import { colors, radius, spaces } from '@src/styles/theme'

import styled from 'styled-components/native'

const Card = styled.View`
  background-color: ${colors.PURPLE};
  padding: ${spaces.MEDIUM}px;
  padding-bottom: ${spaces.X_LARGE}px;
  border-radius: ${radius.SMALL}px;
  position: relative;
  margin-top: ${spaces.LARGE}px;
  margin-bottom: ${spaces.MEDIUM}px;
`

const ImageWrapper = styled.View`
  position: absolute;
  right: 0px;
  top: 72px;
`

const ButtonWrapper = styled.View`
  margin-top: ${spaces.SMALL}px;
`

const CloseIcon = styled.TouchableOpacity`
  align-items: flex-end;
`

interface Props {
  onClose: () => void
}

const RatingUsCard = ({ onClose }: Props) => (
  <Card>
    <ImageWrapper>
      <Image src={ThumbUp} width={100} height={80} />
    </ImageWrapper>
    <CloseIcon onPress={onClose}>
      <Image src={CloseIconWhite} width={40} height={40} />
    </CloseIcon>
    <Text textAlign="left" font="POPPINS_SEMI_BOLD" size="BODY_1">
      Vous aimez Movie App ? {'\n'}
      Donnez votre avis
    </Text>
    <ButtonWrapper>
      <Button>Je donne mon avis</Button>
    </ButtonWrapper>
  </Card>
)

export default RatingUsCard
