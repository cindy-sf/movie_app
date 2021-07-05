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
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  )
}
