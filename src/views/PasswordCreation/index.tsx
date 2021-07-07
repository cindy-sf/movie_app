import React, { ReactElement } from 'react'
import type { NavigationContainerRef } from '@react-navigation/native'

import Button from '@components/Button'
import Image from '@components/Image'
import Input from '@components/Input'
import Layout from '@components/Layout'
import Text from '@components/Text'

import Illustration from '@assets/images/password_creation/password.png'

import { ButtonWrapper, ImageWrapper, InputWrapper } from './index.styles'

interface Props {
  navigation: NavigationContainerRef
}

const PasswordCreation = ({ navigation }: Props): ReactElement => (
  <Layout
    headerOptions={{
      backIcon: {
        onPress: (): void => navigation.navigate('AccountCreation'),
      },
    }}
  >
    <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
      Votre mot de passe
    </Text>
    <ImageWrapper>
      <Image height={175} width={240} src={Illustration} />
    </ImageWrapper>
    <InputWrapper>
      <Input
        value=""
        placeHolder="Mot de passe"
        onChange={() => {}}
        secureTextEntry
      />
      <Input
        value="mot_de_passe"
        placeHolder="Confirmation"
        onChange={() => {}}
        secureTextEntry
      />
    </InputWrapper>
    <ButtonWrapper>
      <Button
        onPress={() => navigation.navigate('AccountCreationConfirmation')}
      >
        S’inscrire
      </Button>
    </ButtonWrapper>
  </Layout>
)

export default PasswordCreation
