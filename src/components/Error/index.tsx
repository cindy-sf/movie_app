import React from 'react'
import { View } from 'react-native'

import ErrorImage from '@assets/images/error/error_image.png'

import Button from '@components/Button'
import Image from '@components/Image'
import Layout from '@components/Layout'
import Text from '@components/Text'

const Error = ({ navigation }: { navigation: any }) => (
  <Layout>
    <View style={{ flex: 2 }}>
      <Text font="POPPINS_SEMI_BOLD" size="HEADLINE_1" maxWidth={320}>
        Navré, une erreur est survenue...
      </Text>
      <View style={{ flex: 0.4 }} />
      <Image src={ErrorImage} height={285} width={270} resizeMode="cover" />
      <View style={{ flex: 0.4 }} />
    </View>
    <View style={{ alignItems: 'center', flex: 0.5 }}>
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
    </View>
  </Layout>
)

export default Error
