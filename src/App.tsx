import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components/native'
import { useFonts } from 'expo-font'
import type { ThemeAttributes } from '@styles/theme'
import { getAppTheme } from '@src/utils'
import { themeToggler } from '@src/redux'

import Landing from '@views/Landing'
import Home from '@views/Home'
import AccountCreation from '@views/AccountCreation'
import Login from '@views/Login'
import AccountCreationConfirmation from '@views/AccountCreationConfirmation'
import PasswordCreation from '@views/PasswordCreation'
import ArticleDetails from '@views/ArticleDetails'
import MovieDetails from '@views/MovieDetails'
import Movies from '@views/Movies'
import Search from '@views/Search'

const Stack = createStackNavigator()

export default function App() {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    animationEnabled: false,
    gestureEnabled: false,
  }
  const dispatch = useDispatch()
  const [storeTheme, setStoredTheme] = useState<ThemeAttributes>()

  useEffect(() => {
    const getTheme = async () => {
      const theme = await getAppTheme()
      setStoredTheme(theme)
      dispatch(themeToggler({ theme }))
    }

    getTheme()
  }, [])

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  })

  if (!storeTheme || !fontsLoaded) return null

  return (
    <NavigationContainer>
      <ThemeProvider theme={storeTheme}>
        <Stack.Navigator mode="modal" initialRouteName="Landing">
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
            name="MovieDetails"
            component={MovieDetails}
            options={screenOptions}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={screenOptions}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  )
}
