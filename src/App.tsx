import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFonts } from 'expo-font'
import styled, { ThemeProvider } from 'styled-components/native'
import { getAppTheme } from './utils'
import { themeToggler } from './redux'
import type { ThemeAttributes } from './styles/theme'

const Title = styled.Text`
  color: ${({ theme }: { theme: ThemeAttributes }) => theme.PRIMARY_TEXT_COLOR};
  font-family: 'Poppins-SemiBold';
`

const Container = styled.View`
  font-family: 'Poppins-SemiBold';
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: ThemeAttributes }) =>
    theme.BACKGROUND};
`
export default function App() {
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
    <ThemeProvider theme={storeTheme}>
      <Container>
        <Title>Custom title</Title>
      </Container>
    </ThemeProvider>
  )
}
