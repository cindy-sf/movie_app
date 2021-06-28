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
  ButtonWrapper,
  CarouselWrapper,
  InputWrapper,
  ItemWrapper,
} from './index.styles'

interface Props {
  navigation: NavigationContainerRef
}

const AccountCreation = ({ navigation }: Props) => {
  const { width: windowWidth } = useWindowDimensions()
  const [selectedPictureName, setSelectedPictureName] = useState<
    UserPictures['imageName']
  >(userPictures[0].imageName)

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
      <CarouselWrapper>
        <Carousel
          data={userPictures}
          renderItem={CarouselItem}
          itemWidth={200}
          sliderWidth={windowWidth}
          itemHeight={200}
          sliderHeight={200}
          onSnapToItem={(i: number) =>
            setSelectedPictureName(userPictures[i].imageName)
          }
        />
      </CarouselWrapper>
      <InputWrapper>
        <Input value="" placeHolder="Nom d’affichage" onChange={() => {}} />
        <Input value="" placeHolder="Nom d’utilisateur" onChange={() => {}} />
        <Input value="" placeHolder="Email" onChange={() => {}} />
      </InputWrapper>
      <Button>Suivant</Button>
      <ButtonWrapper>
        <Text font="POPPINS_SEMI_BOLD" size="BODY_2">
          J’ai déjà un compte
        </Text>
      </ButtonWrapper>
    </Layout>
  )
}

export default AccountCreation
