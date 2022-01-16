import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import Button from '@components/Button'
import Image from '@components/Image'
import Layout from '@components/Layout'
import Text from '@components/Text'

import { spaces } from '@src/styles/theme'
import ToTheMoon from '@assets/images/coming_soon/to_the_moon.png'

const Separator = styled.View`
  flex: 0.5;
  align-items: center;
  justify-content: flex-start;
`

const Container = styled.View`
  flex: 2 auto;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ImageWrapper = styled.View`
  margin-bottom: ${spaces.LARGE}px;
`

const ComingSoon = () => {
  const navigation = useNavigation()
  return (
    <Layout
      headerOptions={{
        closeIcon: { onClose: () => navigation.goBack() },
      }}
    >
      <Separator>
        <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
          De belles choses arrivent !
        </Text>
      </Separator>
      <Container>
        <ImageWrapper>
          <Image src={ToTheMoon} width={354} height={248} />
        </ImageWrapper>
        <Text font="POPPINS_MEDIUM" size="BODY_2" maxWidth={315}>
          Prochainement, consulter les actus{'\n'}séries
        </Text>
      </Container>
      <Separator>
        <Button onPress={navigation.goBack}>Ok !</Button>
      </Separator>
    </Layout>
  )
}

export default ComingSoon
