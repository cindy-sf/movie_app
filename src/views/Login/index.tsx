import React from 'react'
import styled from 'styled-components/native'
import type { NavigationContainerRef } from '@react-navigation/native'

import Button from '@components/Button'
import Image from '@components/Image'
import Input from '@components/Input'
import Layout from '@components/Layout'
import Text from '@components/Text'

import { spaces } from '@src/styles/theme'

import Illustration from '@assets/images/login/login.png'

interface Props {
  navigation: NavigationContainerRef
}

const ButtonWrapper = styled.View`
  flex: 0.5;
  justify-content: flex-end;
  margin-bottom: ${spaces.LARGE}px;
`

const ImageWrapper = styled.View`
  margin-top: ${spaces.X_LARGE}px;
`

const InputWrapper = styled.View`
  flex: 0.5;
  margin-top: ${spaces.X_LARGE}px;
`

const TextWrapper = styled.TouchableOpacity`
  margin-top: ${spaces.LARGE}px;
  margin-bottom: ${spaces.LARGE}px;
`

const Login = ({ navigation }: Props) => (
  <Layout
    headerOptions={{
      closeIcon: { onClose: () => navigation.navigate('Home') },
    }}
  >
    <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
      Se connecter
    </Text>
    <ImageWrapper>
      <Image height={230} width={255} src={Illustration} />
    </ImageWrapper>
    <InputWrapper>
      <Input placeHolder="Email" value="" onChange={() => {}} />
      <Input
        placeHolder="Mot de passe"
        value=""
        onChange={() => {}}
        secureTextEntry
      />
    </InputWrapper>
    <ButtonWrapper>
      <Button onPress={() => navigation.navigate('Home')}>Connexion</Button>
      <TextWrapper onPress={() => navigation.navigate('AccountCreation')}>
        <Text font="POPPINS_SEMI_BOLD" size="BODY_2">
          Je n’ai pas de compte
        </Text>
      </TextWrapper>
    </ButtonWrapper>
  </Layout>
)

export default Login
