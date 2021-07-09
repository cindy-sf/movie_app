import React, { ReactElement } from 'react'
import type { NavigationContainerRef } from '@react-navigation/native'

import Button from '@components/Button'
import Image from '@components/Image'
import Layout from '@components/Layout'
import Text from '@components/Text'

import Illustration from '@assets/images/account_creation_confirmation/notebook.png'

import { ButtonWrapper, ImageWrapper } from './index.styles'

interface Props {
  navigation: NavigationContainerRef
}

const AccountCreationConfirmation = ({ navigation }: Props): ReactElement => (
  <Layout>
    <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
      Votre compte a été créé !
    </Text>
    <ImageWrapper>
      <Image height={210} width={170} src={Illustration} />
    </ImageWrapper>
    <ButtonWrapper>
      <Button onPress={() => navigation.navigate('Login')}>Terminer</Button>
    </ButtonWrapper>
  </Layout>
)

export default AccountCreationConfirmation
