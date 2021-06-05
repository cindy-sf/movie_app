import styled from 'styled-components/native'
import { colors, fontSize, fonts, spaces, ThemeAttributes } from '$styles'

export const Layout = styled.View`
  padding: ${spaces.X_LARGE}px ${spaces.MEDIUM}px;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.BACKGROUND};
  width: ${(props: { width: number }) => props.width}px;
  min-height: ${(props: { minHeight: number }) => props.minHeight}px;
`

export const Title = styled.Text`
  font-family: ${fonts.POPPINS_SEMI_BOLD};
  font-size: ${fontSize.HEADLINE_1}px;
  color: ${({ theme }: { theme: ThemeAttributes }) => theme.PRIMARY_TEXT_COLOR};
  max-width: 270px;
  text-align: center;
`

export const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  flex: 2;
`

export const ScrollContainer = styled.View`
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`
export const ImageWrapper = styled.View`
  width: ${(props: { width: number }) => props.width}px;
  height: 270px;
  margin-bottom: ${spaces.XXX_LARGE}px;
`

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  resize-mode: contain;
  display: flex;
  justify-content: center;
  align-content: flex-end;
`

export const DotsWrapper = styled.View`
  height: 10px;
  border-radius: 8px;
  margin-left: ${spaces.XX_SMALL}px;
  margin-right: ${spaces.XX_SMALL}px;
`

export const IndicatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  align-self: center;
  bottom: 75px;
`
