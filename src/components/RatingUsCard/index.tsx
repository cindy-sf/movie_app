import React from 'react'
import { useSelector } from 'react-redux'

import Image from '@components/Image'
import Text from '@components/Text'

import Button from '@components/Button'
import CloseIconBlack from '@assets/icons/close_icon_black.png'
import CloseIconWhite from '@assets/icons/close_icon_white.png'
import ThumbUp from '@assets/images/movies/thumb_up.png'

import { radius, ThemeAttributes, spaces } from '@src/styles/theme'

import styled from 'styled-components/native'
import { Linking } from 'react-native'
import { PACKAGE_NAME } from '@src/credentials'

const Card = styled.View`
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.RATING_US_CARD_BACKGROUND};
  padding: ${spaces.MEDIUM}px;
  padding-bottom: ${spaces.X_LARGE}px;
  border-radius: ${radius.SMALL}px;
  position: relative;
  margin-bottom: ${spaces.MEDIUM}px;
  width: 100%;
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

const RatingUsCard = ({ onClose }: Props) => {
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const closeIcon = appTheme === 'light' ? CloseIconBlack : CloseIconWhite

  return (
    <Card>
      <ImageWrapper>
        <Image src={ThumbUp} width={100} height={80} />
      </ImageWrapper>
      <CloseIcon onPress={onClose}>
        <Image src={closeIcon} width={40} height={40} />
      </CloseIcon>
      <Text textAlign="left" font="POPPINS_SEMI_BOLD" size="BODY_1">
        Vous aimez Movie App ? {'\n'}
        Donnez votre avis
      </Text>
      <ButtonWrapper>
        <Button
          onPress={(): void => {
            Linking.openURL(`market://details?id=${PACKAGE_NAME}`)
          }}
        >
          Je donne mon avis
        </Button>
      </ButtonWrapper>
    </Card>
  )
}

export default RatingUsCard
