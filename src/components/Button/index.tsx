import React from 'react'
import styled from 'styled-components/native'
import { ThemeAttributes, radius } from '@styles/theme'
import Text from '@components/Text'

export interface ButtonProps {
  children: string
  onPress?: () => void
  disabled?: boolean
}

const CustomButton = styled.TouchableOpacity`
  width: 195px;
  height: 40px;
  background: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.PRIMARY_BUTTON_COLOR};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.75 : 1)};
  border-radius: ${radius.XXX_LARGE}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled = false,
}) => (
  <CustomButton activeOpacity={1} onPress={onPress || null} disabled={disabled}>
    <Text size="BODY_2" color="SECONDARY_TEXT_COLOR" font="POPPINS_SEMI_BOLD">
      {children}
    </Text>
  </CustomButton>
)

export default Button
