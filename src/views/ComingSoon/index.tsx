import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styled from 'styled-components/native'
import type { NavigationContainerRef } from '@react-navigation/native'

import Button from '@components/Button'
import Image from '@components/Image'
import Input from '@components/Input'
import Layout from '@components/Layout'
import Text from '@components/Text'

import { spaces } from '@src/styles/theme'
import ToTheMoon from '@assets/images/coming_soon/to_the_moon.png'
import Illustration from '@assets/images/login/login.png'
import Alert from '@components/Alert'
import { useDispatch } from 'react-redux'
import { fetchUser, signIn } from '@src/redux'

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
  const dispatch = useDispatch()
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>({
    mail: '',
    password: '',
  })

  const handleSubmit = async () => {
    const { mail: user_mail, password: user_password } = userData
    const payload = new FormData()
    payload.append('user_mail', user_mail)
    payload.append('user_password', user_password)
    setAlertMessage(null)
    try {
      setIsSubmitting(true)
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
        const data = await fetchUser(response.data)
        dispatch(signIn(data))
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
      setAlertMessage(response.message)
    } catch (err) {
      console.log('Error', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout
      headerOptions={{
        closeIcon: {
          onClose: () => {
            navigation.navigate('Home')
          },
        },
      }}
    >
      <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
        De belles choses arrivent !
      </Text>
      <ImageWrapper>
        <Image height={354} width={248} src={ToTheMoon} />
        <Text font="POPPINS_MEDIUM" size="BODY_2" maxWidth={315}>
          Prochainement, consulter les actus séries
        </Text>
      </ImageWrapper>
      <ButtonWrapper>
        <Button
          onPress={() => navigation.navigate('Home')}
          disabled={isSubmitting}
        >
          Ok
        </Button>
      </ButtonWrapper>
    </Layout>
  )
}

export default Login
