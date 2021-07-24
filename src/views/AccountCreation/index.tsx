import React, { ReactElement, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import type { NavigationContainerRef } from '@react-navigation/native'

import Carousel from 'react-native-snap-carousel'

import Button from '@components/Button'
import Image from '@components/Image'
import Input from '@components/Input'
import Layout from '@components/Layout'
import Text from '@components/Text'

import { userPictures, UserPictures } from './constants'

import {
  Container,
  ButtonWrapper,
  CarouselWrapper,
  InputWrapper,
  ItemWrapper,
  TextWrapper,
} from './index.styles'

interface Props {
  navigation: NavigationContainerRef
}

interface UserData {
  mail: string
  tag: string
  name: string
  picture: UserPictures['imageName']
}

const AccountCreation = ({ navigation }: Props) => {
  const { width: windowWidth } = useWindowDimensions()
  const [userData, setUserData] = useState<UserData>({
    mail: '',
    tag: '',
    name: '',
    picture: userPictures[0].imageName,
  })
  const [errors, setErrors] = useState<UserData>({
    mail: '',
    tag: '',
    name: '',
    picture: '',
  })
  const handleSubmit = async () => {
    const { mail, name, tag, picture } = userData
    const payload = new FormData()
    payload.append('user_mail', mail)
    payload.append('user_name', name)
    payload.append('user_tag', tag)
    payload.append('user_picture', picture)
    try {
      const register = await fetch(
        'http://api.movieapp.fr/verify?auth_step=0',
        {
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST',
          body: payload,
        }
      )
      const response = await register.json()
      const { user_mail, user_name, user_tag, user_picture } = response.data
      if (response.success)
        navigation.navigate('PasswordCreation', {
          mail: user_mail,
          name: user_name,
          tag: user_tag,
          picture: user_picture,
        })
      else
        setErrors({
          tag: user_tag,
          mail: user_mail,
          name: user_name,
          picture: user_picture,
        })
    } catch (err) {
      console.log(err)
    }
  }

  const CarouselItem = ({ item }: { item: UserPictures }): ReactElement => (
    <ItemWrapper>
      <Image height={200} width={200} src={item.pictureUrl} />
    </ItemWrapper>
  )

  return (
    <Layout
      headerOptions={{
        closeIcon: { onClose: (): void => navigation.navigate('Home') },
      }}
    >
      <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={290}>
        Créer un compte
      </Text>
      <Container showsVerticalScrollIndicator={false} overScrollMode="never">
        <CarouselWrapper>
          <Carousel
            data={userPictures}
            renderItem={CarouselItem}
            itemWidth={200}
            sliderWidth={windowWidth}
            itemHeight={200}
            sliderHeight={200}
            onSnapToItem={(i: number) =>
              setUserData({ ...userData, picture: userPictures[i].imageName })
            }
          />
        </CarouselWrapper>
        <InputWrapper>
          <Input
            value={userData.name}
            placeHolder="Nom d’affichage"
            onTextChange={(text) => setUserData({ ...userData, name: text })}
            errorMessage={errors.name}
          />
          <Input
            value={userData.tag}
            placeHolder="Nom d’utilisateur"
            onTextChange={(text) => setUserData({ ...userData, tag: text })}
            errorMessage={errors.tag}
          />
          <Input
            value={userData.mail}
            placeHolder="Email"
            onTextChange={(text) => setUserData({ ...userData, mail: text })}
            keyboardType="email-address"
            errorMessage={errors.mail}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button onPress={handleSubmit}>Suivant</Button>
        </ButtonWrapper>
        <TextWrapper onPress={(): void => navigation.navigate('Login')}>
          <Text font="POPPINS_SEMI_BOLD" size="BODY_2">
            J’ai déjà un compte
          </Text>
        </TextWrapper>
      </Container>
    </Layout>
  )
}

export default AccountCreation
