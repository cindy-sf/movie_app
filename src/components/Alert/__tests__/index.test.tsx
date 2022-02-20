import 'react-native'
import React from 'react'
// import { render } from '@rlt'
// @Todo: Fix import with the alias
import { render } from '../../../test-helper/test-utils/index'

import Alert from '..'

describe('Alert', () => {
  const defaultProps = {
    message: 'Lorem ipsum...',
  }

  it('should display a message', () => {
    const { getByText } = render(<Alert {...defaultProps} />)

    expect(getByText(defaultProps.message)).toBeTruthy()
  })

  it.only('should hide the message passing configured delay', async () => {
    const { queryByText } = render(<Alert {...defaultProps} timer={2} />)
    jest.runAllTimers()

    expect(await queryByText(defaultProps.message)).toBeFalsy()
  })
})
