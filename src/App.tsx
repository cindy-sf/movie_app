import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components/native'
import { useFonts } from 'expo-font'
import type { ThemeAttributes } from '@styles/theme'
import { getAppTheme, getToken } from '@src/utils'
import { fetchUser, signIn, themeToggler } from '@src/redux'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import Landing from '@views/Landing'
import Home from '@views/Home'
import AccountCreation from '@views/AccountCreation'
import Login from '@views/Login'
import AccountCreationConfirmation from '@views/AccountCreationConfirmation'
import PasswordCreation from '@views/PasswordCreation'
import ArticleDetails from '@views/ArticleDetails'
import MovieDetails from '@views/MovieDetails'
import Movies from '@views/Movies'
import MoviesList from '@views/MoviesList'
import Search from '@views/Search'
import ComingSoon from '@views/ComingSoon'

const Stack = createStackNavigator()

export default function App() {
  const Tab = createBottomTabNavigator()
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    // animationEnabled: false,
    // gestureEnabled: false,
  }
  const dispatch = useDispatch()
  const [storeTheme, setStoredTheme] = useState<ThemeAttributes>()

  useEffect(() => {
    const getTheme = async () => {
      const theme = await getAppTheme()
      setStoredTheme(theme)
      dispatch(themeToggler({ theme }))
    }
    const receiveToken = async () => {
      const token = await getToken()
      dispatch(signIn(await fetchUser(token)))
    }

    getTheme()
    receiveToken()
  }, [])

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  })

  const isConnected =
    useSelector((state: RootStateOrAny) => state.users.user_mail) !== 'DEFAULT'

  if (!storeTheme || !fontsLoaded) return null

  return (
    <NavigationContainer>
      <ThemeProvider theme={storeTheme}>
        <Tab.Navigator>
          <Tab.Screen name="Accueil" component={Home} options={screenOptions} />
          <Tab.Screen
            name="Landing"
            component={Landing}
            options={screenOptions}
          />
        </Tab.Navigator>
        {/* <Stack.Navigator
          mode="modal"
          initialRouteName={isConnected ? 'Home' : 'Landing'}
        >
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={screenOptions}
          />
          <Stack.Screen name="Home" component={Home} options={screenOptions} />
          <Stack.Screen
            name="AccountCreation"
            component={AccountCreation}
            options={screenOptions}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={screenOptions}
          />
          <Stack.Screen
            name="PasswordCreation"
            component={PasswordCreation}
            options={screenOptions}
          />
          <Stack.Screen
            name="AccountCreationConfirmation"
            component={AccountCreationConfirmation}
            options={screenOptions}
          />
          <Stack.Screen
            name="ArticleDetails"
            component={ArticleDetails}
            options={screenOptions}
          />
          <Stack.Screen
            name="Movies"
            component={Movies}
            options={screenOptions}
          />
          <Stack.Screen
            name="ComingSoon"
            component={ComingSoon}
            options={screenOptions}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={screenOptions}
          />
          <Stack.Screen
            name="MoviesList"
            component={MoviesList}
            options={screenOptions}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={screenOptions}
          />
        </Stack.Navigator> */}
      </ThemeProvider>
    </NavigationContainer>
  )
}
