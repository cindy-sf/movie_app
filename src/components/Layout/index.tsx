import React from 'react'
import {
  ImageSourcePropType,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'

import CloseIconBlack from '@assets/icons/close_icon_black.png'
import CloseIconWhite from '@assets/icons/close_icon_white.png'
import SearchIconWhite from '@assets/icons/search_icon_white.png'
import SearchIconBlack from '@assets/icons/search_icon_black.png'

import Image from '@components/Image'

import { colors, ThemeAttributes } from '@src/styles/theme'
import {
  CloseIcon,
  Header,
  LayoutWrapper,
  UserPictureWrapper,
  SearchIconWrapper,
  SearchBar,
  SearchBarWrapper,
} from './index.styles'

interface Props {
  headerOptions?: HeaderOptions
}

interface HeaderOptions {
  closeIcon?: CloseIconProperties
  searchBar?: SearchBarProperties
  userPicture?: UserPictureProperties
}

interface CloseIconProperties {
  onClose: () => void
}

interface SearchBarProperties {
  onPress: () => void
}

interface UserPictureProperties {
  src: ImageSourcePropType
  onPress: () => void
}

const Layout: React.FC<Props> = ({ children, headerOptions }) => {
  const { width: windowWidth } = useWindowDimensions()
  const appTheme = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const searchIconImage =
    appTheme === 'light' ? SearchIconBlack : SearchIconWhite

  return (
    <LayoutWrapper width={windowWidth}>
      <Header>
        {/* Left Header content */}
        <View>
          {headerOptions?.searchBar && (
            <TouchableOpacity onPress={headerOptions.searchBar.onPress}>
              <SearchBarWrapper>
                <SearchIconWrapper>
                  <Image src={searchIconImage} width={22} height={22} />
                </SearchIconWrapper>
                <SearchBar
                  value=""
                  placeholder="Rechercher..."
                  placeholderTextColor={
                    appTheme === 'light' ? colors.BLACK : colors.WHITE
                  }
                  onChangeText={() => {}}
                />
              </SearchBarWrapper>
            </TouchableOpacity>
          )}
        </View>
        {/* Right Header content */}
        <View>
          {headerOptions?.closeIcon && (
            <TouchableOpacity onPress={headerOptions.closeIcon.onClose}>
              <CloseIcon
                source={appTheme === 'light' ? CloseIconBlack : CloseIconWhite}
              />
            </TouchableOpacity>
          )}
          {headerOptions?.userPicture && (
            <UserPictureWrapper onPress={headerOptions.userPicture.onPress}>
              <Image
                width={50}
                height={50}
                src={headerOptions.userPicture.src}
              />
            </UserPictureWrapper>
          )}
        </View>
      </Header>
      <View style={{ alignItems: 'center', flex: 5 }}>{children}</View>
    </LayoutWrapper>
  )
}

export default Layout
