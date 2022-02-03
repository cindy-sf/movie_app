import React, { ReactElement, ReactNode, useState } from 'react'
import { useWindowDimensions, TouchableOpacity, View } from 'react-native'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import * as Updates from 'expo-updates'
import { StatusBar } from 'expo-status-bar'

import ChevronIconBlack from '@assets/icons/chevron_icon_black.png'
import ChevronIconWhite from '@assets/icons/chevron_icon_white.png'
import CloseIconBlack from '@assets/icons/close_icon_black.png'
import CloseIconWhite from '@assets/icons/close_icon_white.png'
import SearchIconWhite from '@assets/icons/search_icon_white.png'
import SearchIconBlack from '@assets/icons/search_icon_black.png'
import ShareIconWhite from '@assets/icons/share_icon_white.png'
import ShareIconBlack from '@assets/icons/share_icon_black.png'

import BottomSheets from '@components/BottomSheets'
import Image from '@components/Image'
import MenuContent from '@components/BottomSheets/components/MenuContent'
import Text from '@components/Text'

import { storeAppTheme } from '@src/utils'
import { themeToggler } from '@src/redux'
import {
  colors,
  darkTheme,
  lightTheme,
  spaces,
  ThemeAttributes,
} from '@src/styles/theme'

import {
  CloseIcon,
  Header,
  LayoutContent,
  LayoutWrapper,
  UserPictureWrapper,
  SearchIconWrapper,
  SearchBar,
  SearchBarWrapper,
  ShareAction,
  ShareImage,
  ImageWrapper,
} from './index.styles'

interface Props {
  headerOptions?: HeaderOptions
  customHeaderConfig?: ReactNode
}

export interface HeaderOptions {
  closeIcon?: CloseIconProperties
  backIcon?: BackIconProperties
  searchBar?: SearchBarProperties
  displayUserPicture?: boolean
  shareAction?: BackIconProperties
  pageTitle?: string | ReactElement
}

interface BackIconProperties {
  onPress: () => void
}

interface CloseIconProperties {
  onClose: () => void
}

interface SearchBarProperties {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChangeText: (e: string) => void
  onSubmit: () => void
}

const Layout: React.FC<Props> = ({
  children,
  headerOptions,
  customHeaderConfig,
}) => {
  const dispatch = useDispatch()
  const { width: windowWidth } = useWindowDimensions()
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )

  const searchIconImage =
    appTheme === 'light' ? SearchIconBlack : SearchIconWhite
  const shareIconImage = appTheme === 'light' ? ShareIconBlack : ShareIconWhite

  const toggleBottomNavigationView = (): void =>
    setIsBottomSheetVisible(!isBottomSheetVisible)

  const switchTheme = async (theme: ThemeAttributes): Promise<void> => {
    if (theme.mode === appTheme) return

    storeAppTheme(theme.mode)
    dispatch(themeToggler({ theme }))
    await Updates.reloadAsync()
  }
  const UserPicture = useSelector(
    (state: RootStateOrAny) => state.users.user_picture
  )

  return (
    <LayoutWrapper width={windowWidth}>
      <StatusBar style={appTheme === 'light' ? 'dark' : 'light'} />
      <Header flexDirection={headerOptions?.backIcon ? 'row-reverse' : 'row'}>
        {/* Specific case for webview header */}
        {customHeaderConfig && customHeaderConfig}
        {/* ***** */}
        {/* Left Header content */}
        <View>
          {headerOptions?.searchBar && (
            <SearchBarWrapper>
              <SearchIconWrapper>
                <Image src={searchIconImage} width={22} height={22} />
              </SearchIconWrapper>
              <SearchBar
                value={headerOptions.searchBar.value}
                placeholder="Rechercher..."
                placeholderTextColor={
                  appTheme === 'light' ? colors.BLACK : colors.WHITE
                }
                onChangeText={headerOptions?.searchBar.onChangeText}
                onSubmitEditing={headerOptions.searchBar.onSubmit}
              />
            </SearchBarWrapper>
          )}
          {headerOptions?.shareAction && (
            <ShareAction onPress={headerOptions.shareAction.onPress}>
              <ShareImage>
                <Image src={shareIconImage} width={22} height={22} />
              </ShareImage>
              <Text size="OVERLINE">Partager</Text>
            </ShareAction>
          )}
        </View>
        {/* Right Header content */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {headerOptions?.closeIcon && (
            <TouchableOpacity onPress={headerOptions.closeIcon.onClose}>
              <CloseIcon
                source={appTheme === 'light' ? CloseIconBlack : CloseIconWhite}
              />
            </TouchableOpacity>
          )}
          {headerOptions?.backIcon && (
            <TouchableOpacity onPress={headerOptions.backIcon.onPress}>
              <CloseIcon
                source={
                  appTheme === 'light' ? ChevronIconBlack : ChevronIconWhite
                }
              />
            </TouchableOpacity>
          )}
          {headerOptions?.pageTitle && (
            <View style={{ marginLeft: spaces.MEDIUM }}>
              {typeof headerOptions.pageTitle === 'string' ? (
                <Text size="HEADLINE_2" font="POPPINS_SEMI_BOLD">
                  {headerOptions.pageTitle}
                </Text>
              ) : (
                headerOptions.pageTitle
              )}
            </View>
          )}
          {headerOptions?.displayUserPicture && (
            <UserPictureWrapper onPress={toggleBottomNavigationView}>
              <ImageWrapper>
                <Image
                  width={50}
                  height={50}
                  src={UserPicture}
                  resizeMode="contain"
                />
              </ImageWrapper>
            </UserPictureWrapper>
          )}
        </View>
      </Header>
      <LayoutContent>{children}</LayoutContent>
      <BottomSheets
        onBackdropPress={toggleBottomNavigationView}
        isVisible={isBottomSheetVisible}
      >
        <MenuContent
          onDarkThemeSelection={(): Promise<void> => switchTheme(darkTheme)}
          onLightThemeSelection={(): Promise<void> => switchTheme(lightTheme)}
          appTheme={appTheme}
        />
      </BottomSheets>
    </LayoutWrapper>
  )
}

export default Layout
