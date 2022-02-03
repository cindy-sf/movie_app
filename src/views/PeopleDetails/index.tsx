import React, { ReactElement, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation, RouteProp } from '@react-navigation/native'

import Error from '@components/Error'
import Image from '@components/Image'
import Loader from '@components/Loader'
import Layout from '@components/Layout'
import Text from '@components/Text'

import type { PeopleType } from '@src/types'
import { API_VERSION, MOVIE_DB_API_KEY } from '@src/credentials'

import { colors, radius, spaces } from '@src/styles/theme'
import { ScrollView } from 'react-native-gesture-handler'

export interface Props {
  route: RouteProp<
    {
      params: {
        peopleId: number
      }
    },
    'params'
  >
}

const PeoplePicture = ({
  picture,
}: {
  picture: PeopleType['profile_path']
}): ReactElement => (
  <View
    style={{
      overflow: 'hidden',
      marginBottom: spaces.LARGE,
      backgroundColor: colors.PURPLE,
      borderRadius: radius.MEDIUM,
      width: 150,
      height: 220,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
    <Image
      src={{ uri: `https://image.tmdb.org/t/p/w500${picture}` }}
      width={150}
      height={220}
      resizeMode="cover"
    />
  </View>
)

const PeopleDetails = ({ route }: Props): ReactElement => {
  const [shouldDisplayError, setShouldDisplayError] = useState<boolean>(false)
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true)
  const [peopleDetails, setPeopleDetails] = useState<PeopleType>()
  const navigation = useNavigation()

  useEffect(() => {
    const fetchPeopleDetails = async () => {
      try {
        const peopleDetailsData = await fetch(
          `https://api.themoviedb.org/${API_VERSION}/person/${route.params.peopleId}?api_key=${MOVIE_DB_API_KEY}&language=fr`
        )
        const response = await peopleDetailsData.json()
        setPeopleDetails(response)
      } catch (error) {
        setShouldDisplayError(true)
      } finally {
        setIsDataFetching(false)
      }
    }

    fetchPeopleDetails()
  }, [route.params.peopleId])

  if (isDataFetching || !peopleDetails) return <Loader />

  if (shouldDisplayError) return <Error />

  return (
    <Layout
      headerOptions={{
        backIcon: {
          onPress: (): void => navigation.goBack(),
        },
        shareAction: {
          onPress: (): void => {},
        },
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        style={{ marginTop: spaces.LARGE }}
      >
        <PeoplePicture picture={peopleDetails.profile_path} />
        <Text font="POPPINS_SEMI_BOLD">{peopleDetails.name}</Text>
        <Text textAlign="left" size="BODY_2">
          {peopleDetails.biographie
            ? peopleDetails.biographie
            : 'Pas de biographie pour cette personnalitée :('}
        </Text>
      </ScrollView>
    </Layout>
  )
}

export default PeopleDetails
