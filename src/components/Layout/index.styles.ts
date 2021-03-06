import styled from 'styled-components/native'
import {
  borderWidth,
  colors,
  fontSize,
  radius,
  spaces,
  ThemeAttributes,
} from '@styles/theme'

export const LayoutWrapper = styled.View`
  padding: ${spaces.X_LARGE}px ${spaces.MEDIUM}px;
  padding-bottom: 0px;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.BACKGROUND};
  width: ${(props: { width: number }) => props.width}px;
  flex: 1;
`

export const LayoutContent = styled.View`
  align-items: center;
  flex: 5px;
`

export const Header = styled.View`
  height: 96px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: ${(props: { flexDirection: number }) => props.flexDirection};
  justify-content: space-between;
`

export const CloseIcon = styled.Image`
  width: 42px;
  height: 42px;
`

export const UserPictureWrapper = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  border-style: solid;
  border-width: ${borderWidth.X_SMALL}px;
  border-color: ${colors.PURPLE};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  padding: ${spaces.LARGE}px;
`

export const ImageWrapper = styled.View`
  border-radius: 60px;
  overflow: hidden;
  width: 50px;
  height: 50px;
`

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: flex-end;
`

export const SearchBarWrapper = styled.View`
  width: 255px;
  height: 52px;
  position: relative;
`

export const SearchBar = styled.TextInput`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.INPUT_BACKGROUND};
  color: ${({ theme }: { theme: ThemeAttributes }) => theme.PRIMARY_TEXT_COLOR};
  border-radius: ${radius.LARGE}px;
  padding-left: 62px;
  font-family: 'Poppins-Italic';
  font-size: ${fontSize.OVERLINE}px;
  shadow-color: ${colors.BLACK};
  shadow-offset: 0px 4px;
  shadow-radius: 4.65px;
  elevation: 7;
`

export const SearchIconWrapper = styled.View`
  position: absolute;
  top: 13px;
  left: 28px;
  z-index: 34;
  elevation: 34;
`

export const ShareAction = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ShareImage = styled.View`
  margin-right: ${spaces.SMALL}px;
`
