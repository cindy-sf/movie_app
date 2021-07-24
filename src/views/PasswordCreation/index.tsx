import React, { useState, ReactElement } from 'react'
import type {
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native'

import Button from '@components/Button'
import Image from '@components/Image'
import Input from '@components/Input'
import Layout from '@components/Layout'
import Text from '@components/Text'

import Illustration from '@assets/images/password_creation/password.png'

import Alert from '@components/Alert'
import { ButtonWrapper, ImageWrapper, InputWrapper } from './index.styles'

interface Props {
  navigation: NavigationContainerRef
  route: RouteProp<
    {
      params: {
        mail: string
        picture: string
        tag: string
        name: string
      }
    },
    'params'
  >
}

interface UserData {
  password: string
  confirm_password: string
}

const PasswordCreation = ({ navigation, route }: Props): ReactElement => {
  const [userData, setUserData] = useState<UserData>({
    password: '',
    confirm_password: '',
  })
  const initialErrors = {
    password: '',
    confirm_password: '',
  }
  const [errors, setErrors] = useState<UserData>(initialErrors)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const handleSubmit = async () => {
    const { password, confirm_password } = userData
    const payload = new FormData()
    setAlertMessage(null)
    setErrors(initialErrors)
    payload.append('user_password', password)
    payload.append('user_confirm_password', confirm_password)
    try {
      const secondStep = await fetch(
        'http://api.movieapp.fr/verify?auth_step=1',
        {
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST',
          body: payload,
        }
      )
      let response = await secondStep.json()
      const { user_password, user_confirm_password } = response.data
      const { mail, picture, tag, name } = route.params
      payload.append('user_mail', mail)
      payload.append('user_name', name)
      payload.append('user_tag', tag)
      payload.append('user_picture', picture)
      if (response.success) {
        const register = await fetch('http://api.movieapp.fr/users/', {
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST',
          body: payload,
        })
        response = await register.json()
        if (response.success) navigation.navigate('AccountCreationConfirmation')
        else setAlertMessage(response.message)
      } else
        setErrors({
          password: user_password,
          confirm_password: user_confirm_password,
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Layout
      headerOptions={{
        backIcon: {
          onPress: (): void => navigation.navigate('AccountCreation'),
        },
      }}
    >
      {alertMessage && <Alert message={alertMessage} />}
      <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
        Votre mot de passe
      </Text>
      <ImageWrapper>
        <Image height={175} width={240} src={Illustration} />
      </ImageWrapper>
      <InputWrapper>
        <Input
          value={userData.password}
          placeHolder="Mot de passe"
          onTextChange={(text) => setUserData({ ...userData, password: text })}
          errorMessage={errors.password}
          secureTextEntry
        />
        <Input
          value={userData.confirm_password}
          placeHolder="Confirmation"
          onTextChange={(text) =>
            setUserData({ ...userData, confirm_password: text })
          }
          errorMessage={errors.confirm_password}
          secureTextEntry
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button onPress={handleSubmit}>S’inscrire</Button>
      </ButtonWrapper>
    </Layout>
  )
}

export default PasswordCreation
