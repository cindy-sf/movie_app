import React from 'react'
import { useSelector } from 'react-redux'
import { Share, useWindowDimensions, TouchableOpacity } from 'react-native'
import type { NavigationContainerRef } from '@react-navigation/native'
import styled from 'styled-components/native'

import CloseIconWhite from '@assets/icons/close_icon_white.png'
import CloseIconBlack from '@assets/icons/close_icon_black.png'
import ShareIconWhite from '@assets/icons/share_icon_white.png'
import ShareIconBlack from '@assets/icons/share_icon_black.png'

import Image from '@components/Image'
import Text from '@components/Text'

import { spaces, ThemeAttributes } from '@styles/theme'

import type { News } from '@views/Home/types'

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`

const CloseIconWrapper = styled.TouchableOpacity`
  margin-left: ${spaces.MEDIUM}px;
`

const WebViewHeaderWrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

export interface Props {
  navigation: NavigationContainerRef
  selectedArticleTitle: News['title']
  selectedArticleUrl: News['url']
}

const WebViewHeader = ({
  navigation,
  selectedArticleTitle,
  selectedArticleUrl,
}: Props) => {
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const { width } = useWindowDimensions()

  const CloseIcon = appTheme === 'light' ? CloseIconBlack : CloseIconWhite
  const ShareIcon = appTheme === 'light' ? ShareIconBlack : ShareIconWhite

  const shareArticle = async (): Promise<void> => {
    try {
      await Share.share({
        message: `Regarde, j’ai trouvé cet article très intéressant sur Movie App. Tu devrais jeter un coup d’oeil 👀 ! \n ${selectedArticleUrl}`,
      })
    } catch (error) {
      // Do nothing for now
    }
  }

  return (
    <WebViewHeaderWrapper width={width - 32}>
      <Text maxWidth={235} textAlign="left" size="BODY_2">
        {selectedArticleTitle}
      </Text>
      <Actions>
        <TouchableOpacity onPress={shareArticle}>
          <Image src={ShareIcon} width={25} height={25} />
        </TouchableOpacity>
        <CloseIconWrapper onPress={(): void => navigation.navigate('Home')}>
          <Image src={CloseIcon} width={40} height={40} />
        </CloseIconWrapper>
      </Actions>
    </WebViewHeaderWrapper>
  )
}

export default WebViewHeader
