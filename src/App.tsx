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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export default function App() {
  const screenOptions = {
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

  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <ThemeProvider theme={storeTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarButton: !['Home', 'Movies'].includes(route.name)
              ? () => null
              : undefined,
          })}
          initialRouteName={isConnected ? 'Home' : 'Landing'}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen
            name="Landing"
            component={Landing}
            options={{
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name="AccountCreation"
            component={AccountCreation}
            options={{
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name="PasswordCreation"
            component={PasswordCreation}
            options={{
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name="AccountCreationConfirmation"
            component={AccountCreationConfirmation}
            options={{
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tab.Screen name="ArticleDetails" component={ArticleDetails} />
          <Tab.Screen name="Movies" component={Movies} />
          <Tab.Screen
            name="ComingSoon"
            component={ComingSoon}
            options={{
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tab.Screen name="MovieDetails" component={MovieDetails} />
          <Tab.Screen name="MoviesList" component={MoviesList} />
          <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  )
}
