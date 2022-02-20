import AsyncStorage from '@react-native-community/async-storage'
import { darkTheme, lightTheme } from '@styles/theme'
import { getAppTheme, getToken, storeAppTheme } from '..'

describe('getAppTheme', () => {
  afterEach(jest.clearAllMocks)

  describe('without stored theme', () => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('')

    it('should return the light theme by default without stored theme in the app', async () => {
      const result = await getAppTheme()

      expect(result).toEqual(lightTheme)
    })

    it('should set the light theme without stored theme in the app', async () => {
      jest.spyOn(AsyncStorage, 'setItem')
      const result = await getAppTheme()

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'light')
      expect(result).toEqual(lightTheme)
    })
  })

  describe('with stored theme', () => {
    it('should return the dark theme if the stored theme is equal to "dark"', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('dark')
      const result = await getAppTheme()

      expect(result).toEqual(darkTheme)
    })

    it('should return the light theme if the stored theme is equal to "light"', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('light')
      const result = await getAppTheme()

      expect(result).toEqual(lightTheme)
    })
  })

  describe('storeAppTheme', () => {
    it('should store the disired theme in the app storage', async () => {
      jest.spyOn(AsyncStorage, 'setItem')
      await storeAppTheme('light')

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'light')
    })
  })

  describe('getToken', () => {
    it('should get auth token in app storage', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('SOME_TOKEN')
      const result = await getToken()

      expect(result).toEqual('SOME_TOKEN')
    })
  })
})
