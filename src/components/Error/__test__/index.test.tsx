import 'react-native'
import React from 'react'
import { fireEvent, render } from '@src/utils/utils-test'

import Error from '..'

describe('Error', () => {
  const options = {

  }

  const navigationProps = {
    navigation: {
      reset: jest.fn()
    },
  } as any

  // it('renders correctly', () => {
  //   const { getByText } = render(<Error navigation={navigationProps} />)

  //   expect(getByText('Navré, une erreur est survenue...')).to
  // })

  it('should redirect to Home page by clicking on close button', () => {
    const { getByText } = render(<Error navigation={navigationProps} />, {})

    fireEvent.press(getByText('Revenir à l’accueil'))

    expect(navigationProps.navigation.reset).toHaveBeenCalledTimes(1)
  })
})
