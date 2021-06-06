import styled from 'styled-components/native'
import { spaces, ThemeAttributes } from '@styles/theme'

export const LayoutWrapper = styled.View`
  padding: ${spaces.X_LARGE}px ${spaces.MEDIUM}px;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.BACKGROUND};
  width: ${(props: { width: number }) => props.width}px;
  flex: 1;
`

export const Header = styled.View`
  flex: 0.5;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const CloseIcon = styled.Image`
  width: 42px;
  height: 42px;
`
