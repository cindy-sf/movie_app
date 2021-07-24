import React, { FC } from 'react'
import { BottomSheet } from 'react-native-btr'
import styled from 'styled-components/native'

import {
  borderWidth,
  colors,
  radius,
  spaces,
  ThemeAttributes,
} from '@src/styles/theme'

const BottomSheetContent = styled.View`
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.BOTTOM_SHEET_BACKGROUND};
  border-top-left-radius: ${radius.MEDIUM}px;
  border-top-right-radius: ${radius.MEDIUM}px;
  padding-left: ${spaces.LARGE}px;
  padding-right: ${spaces.LARGE}px;
  padding-bottom: ${spaces.MEDIUM}px;
  border-color: ${colors.GREY_DARK};
  border-width: ${borderWidth.SMALL}px;
  border-bottom-width: 0px;
`

const Bar = styled.View`
  width: 65px;
  height: 4px;
  border-radius: ${radius.MEDIUM}px;
  background-color: ${colors.GREY_LIGHT};
  margin-top: ${spaces.MEDIUM}px;
  margin-right: auto;
  margin-bottom: ${spaces.X_LARGE}px;
  margin-left: auto;
`

interface Props {
  isVisible: boolean
  onBackdropPress: () => void
}

const BottomSheets: FC<Props> = ({ children, isVisible, onBackdropPress }) => (
  <BottomSheet visible={isVisible} onBackdropPress={onBackdropPress}>
    <BottomSheetContent>
      <Bar />
      {children}
    </BottomSheetContent>
  </BottomSheet>
)

export default BottomSheets
