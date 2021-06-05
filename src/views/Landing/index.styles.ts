import styled from 'styled-components/native'
import { spaces, ThemeAttributes } from '$styles'

export const Layout = styled.View`
  padding: ${spaces.X_LARGE}px ${spaces.MEDIUM}px;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.BACKGROUND};
  width: ${(props: { width: number }) => props.width}px;
  min-height: ${(props: { minHeight: number }) => props.minHeight}px;
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

export const Separator = styled.View`
  flex: 0.5;
  align-items: center;
  justify-content: center;
`
