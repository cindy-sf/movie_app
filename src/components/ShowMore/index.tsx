import React, { ReactElement, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import Text from '@components/Text'

import { spaces } from '@src/styles/theme'

interface ShowMoreProps {
  text: string
  limit: number
}

interface ToggleLimitTextProps {
  children: string
  onPress: () => void
}

const ShowMore = ({ text, limit }: ShowMoreProps): ReactElement => {
  const [textLimit, setTextLimit] = useState<number>(limit)
  const ToggleLimitText = ({
    children,
    onPress,
  }: ToggleLimitTextProps): ReactElement => (
    <TouchableOpacity onPress={onPress}>
      <Text
        textAlign="left"
        font="POPPINS_BOLD"
        size="BODY_2"
        textDecoration="underline"
      >
        {children}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={{ marginBottom: spaces.XX_SMALL }}>
      <Text size="BODY_2" textAlign="left" limit={textLimit}>
        {text}
      </Text>
      {textLimit > 0 ? (
        <ToggleLimitText onPress={(): void => setTextLimit(0)}>
          Lire la suite
        </ToggleLimitText>
      ) : (
        <ToggleLimitText onPress={(): void => setTextLimit(limit)}>
          Voir moins
        </ToggleLimitText>
      )}
    </View>
  )
}

export default ShowMore
