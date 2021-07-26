import Text from '@components/Text'
import { radius, spaces, ThemeAttributes } from '@src/styles/theme'
import styled from 'styled-components/native'
import React, { useEffect, useState } from 'react'

export interface AlertProps {
  color?: keyof Omit<ThemeAttributes, 'mode'>
  message: string
  timer?: number
}

const AlertContainer = styled.View`
  position: absolute;
  background: ${(props: {
    color: AlertProps['color']
    theme: ThemeAttributes
  }) => props.color && `${props.theme[props.color]}`};
  top: -75px;
  z-index: 1;
  padding: ${spaces.MEDIUM}px;
  border-radius: ${radius.SMALL}px;
  left: 0;
  right: 0;
`

const Alert = ({
  color = 'ERROR_TEXT_COLOR',
  message,
  timer = 5,
}: AlertProps) => {
  const [timeLeft, setTimeLeft] = useState(timer)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!timeLeft) setVisible(false)
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId)
  }, [timeLeft])

  if (visible)
    return (
      <AlertContainer color={color} onTouchStart={() => setVisible(false)}>
        <Text size="BODY_1" color="ALERT_TEXT_COLOR">
          {message}
        </Text>
      </AlertContainer>
    )
  return null
}

export default Alert
