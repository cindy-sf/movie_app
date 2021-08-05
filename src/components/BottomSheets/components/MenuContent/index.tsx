import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import Image from '@components/Image'
import Text from '@components/Text'
import ThemeSelection from '@components/BottomSheets/components/ThemeSelection'

import EditSquareIconBlack from '@assets/icons/edit_square_icon_black.png'
import EditSquareIconWhite from '@assets/icons/edit_square_icon_white.png'
import BlackAvatar from '@assets/icons/profil_logo_black.png'
import WhiteAvatar from '@assets/icons/profil_logo_white.png'

import { spaces, ThemeAttributes } from '@src/styles/theme'
import { RootStateOrAny, useSelector } from 'react-redux'

const ThemeSelectionWrapper = styled.View`
  flex-direction: row;
  margin-top: ${spaces.SMALL}px;
  margin-bottom: ${spaces.XX_LARGE}px;
`

const MenuItems = styled.View`
  margin-bottom: ${spaces.MEDIUM}px;
  flex-direction: row;
`

interface Props {
  appTheme: ThemeAttributes['mode']
  onLightThemeSelection: () => Promise<void>
  onDarkThemeSelection: () => Promise<void>
}

const MenuContent = ({
  appTheme,
  onLightThemeSelection,
  onDarkThemeSelection,
}: Props) => {
  const isConnected =
    useSelector((state: RootStateOrAny) => state.users.user_mail) !== 'DEFAULT'
  const editSquareIcon =
    appTheme === 'light' ? EditSquareIconBlack : EditSquareIconWhite
  const AvatarIcon = appTheme === 'light' ? BlackAvatar : WhiteAvatar

  return (
    <View>
      <MenuItems>
        <View style={{ marginRight: spaces.SMALL }}>
          <Image src={AvatarIcon} width={28} height={28} />
        </View>
        <Text font="POPPINS_MEDIUM" size="SUBTITLE" textAlign="left">
          {isConnected ? 'Profil' : 'Connexion'}
        </Text>
      </MenuItems>
      <MenuItems>
        <View style={{ marginRight: spaces.SMALL }}>
          <Image src={editSquareIcon} width={28} height={28} />
        </View>
        <Text font="POPPINS_MEDIUM" size="SUBTITLE" textAlign="left">
          Apparence
        </Text>
      </MenuItems>
      <Text font="POPPINS_MEDIUM" size="BODY_1" textAlign="left">
        Sélectionner un thème
      </Text>
      <ThemeSelectionWrapper>
        <ThemeSelection
          theme="Clair"
          onPress={onLightThemeSelection}
          isSelectedTheme={appTheme === 'light'}
        />
        <ThemeSelection
          theme="Foncé"
          onPress={onDarkThemeSelection}
          isSelectedTheme={appTheme === 'dark'}
        />
      </ThemeSelectionWrapper>
      <Text size="BODY_2">© 2021 SFTeam, Inc.</Text>
    </View>
  )
}

export default MenuContent
