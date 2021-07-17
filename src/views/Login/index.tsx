import React, { useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styled from 'styled-components/native'
import type { NavigationContainerRef } from '@react-navigation/native'

import Button from '@components/Button'
import Image from '@components/Image'
import Input from '@components/Input'
import Layout from '@components/Layout'
import Text from '@components/Text'

import { spaces } from '@src/styles/theme'

import Illustration from '@assets/images/login/login.png'

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

interface Props {
  navigation: NavigationContainerRef
}

interface UserData {
  mail: string
  password: string
}

const Login = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<UserData>({
    mail: '',
    password: '',
  })

  const handleSubmit = async () => {
    const { mail: user_mail, password: user_password } = userData
    const payload = new FormData()
    payload.append('user_mail', user_mail)
    payload.append('user_password', user_password)

    try {
      const loginRequest = await fetch('http://api.movieapp.fr/auth', {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: payload,
      })
      const response = await loginRequest.json()

      if (response.success) {
        await AsyncStorage.setItem('auth_token', response.data)
        setUserData({
          mail: '',
          password: '',
        })
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
        return
      }

      Alert.alert('Error')
    } catch (err) {
      console.log('error', err)
      Alert.alert('@catch error')
      // Nothing for now
    }
  }

  return (
    <Layout
      headerOptions={{
        closeIcon: {
          onClose: () => {
            navigation.navigate('Home')
            setUserData({ mail: '', password: '' })
          },
        },
      }}
    >
      <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
        Se connecter
      </Text>
      <ImageWrapper>
        <Image height={230} width={255} src={Illustration} />
      </ImageWrapper>
      <InputWrapper>
        <Input
          placeHolder="Email"
          value={userData.mail}
          onChange={(text) => setUserData({ ...userData, mail: text })}
        />
        <Input
          placeHolder="Mot de passe"
          value={userData.password}
          onChange={(text) => setUserData({ ...userData, password: text })}
          secureTextEntry
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button onPress={handleSubmit}>Connexion</Button>
        <TextWrapper onPress={() => navigation.navigate('AccountCreation')}>
          <Text font="POPPINS_SEMI_BOLD" size="BODY_2">
            Je n’ai pas de compte
          </Text>
        </TextWrapper>
      </ButtonWrapper>
    </Layout>
  )
}

export default Login