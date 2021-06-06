import React from 'react'
import styled from 'styled-components/native'
import { ThemeAttributes } from '@styles/theme'
import Text from '@components/Text'

export interface ButtonProps {
  children: string
}

const CustomButton = styled.TouchableOpacity`
  width: 195px;
  height: 40px;
  background: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.PRIMARY_BUTTON_COLOR};
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button: React.FC<ButtonProps> = ({ children }) => (
  <CustomButton activeOpacity={1} onPress={() => null}>
    <Text size="BODY_2" color="secondary" font="POPPINS_SEMI_BOLD">
      {children}
    </Text>
  </CustomButton>
)

export default Button
