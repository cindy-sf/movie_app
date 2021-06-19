import React from 'react'
import styled from 'styled-components/native'

import ErrorImage from '@assets/images/error/error_image.png'

import Button from '@components/Button'
import Image from '@components/Image'
import Layout from '@components/Layout'
import Text from '@components/Text'

const TitleWrapper = styled.View`
  flex: 2px;
`

const Separator = styled.View`
  flex: 0.4px;
`

const BottomArea = styled.View`
  align-items: center;
  flex: 0.5px;
`

const Error = ({ navigation }: { navigation: any }) => (
  <Layout>
    <TitleWrapper>
      <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={320}>
        Navré, une erreur est survenue...
      </Text>
      <Separator />
      <Image src={ErrorImage} height={285} width={270} resizeMode="cover" />
      <Separator />
    </TitleWrapper>
    <BottomArea>
      <Button
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }
      >
        Revenir à l’accueil
      </Button>
    </BottomArea>
  </Layout>
)

export default Error
