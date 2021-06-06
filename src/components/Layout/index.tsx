import React from 'react'
import { useWindowDimensions, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import CloseIconDark from '../../assets/icons/close_icon_dark.png'
import CloseIconLight from '../../assets/icons/close_icon_light.png'

import { CloseIcon, Header, LayoutWrapper } from './index.styles'

interface Props {
  headerOptions?: HeaderOptions
}

interface HeaderOptions {
  closeIcon: CloseIconProperties
}

interface CloseIconProperties {
  onClose: () => void
}

const Layout: React.FC<Props> = ({ children, headerOptions }) => {
  const { width: windowWidth } = useWindowDimensions()
  const appTheme = useSelector((state: any) => state.theme.mode)

  return (
    <LayoutWrapper width={windowWidth}>
      <Header>
        {/* Left Header content */}
        <View />
        {/* Right Header content */}
        <View>
          {headerOptions?.closeIcon && (
            <TouchableOpacity onPress={headerOptions.closeIcon.onClose}>
              <CloseIcon
                source={appTheme === 'light' ? CloseIconDark : CloseIconLight}
              />
            </TouchableOpacity>
          )}
        </View>
      </Header>
      {children}
    </LayoutWrapper>
  )
}

export default Layout
