import React from 'react'
import { useSelector } from 'react-redux'
import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

import { ThemeAttributes } from '@src/styles/theme'

import LoadingImageDark from '@assets/images/loader/loading_dark.gif'
import LoadingImageLight from '@assets/images/loader/loading_light.gif'

import Image from '@components/Image'
import Layout, { HeaderOptions } from '@components/Layout'

const LoaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${({ width }: { width: number }) => `${width}px`};
  margin-bottom: ${({ marginBottom }: { marginBottom: number }) =>
    `${marginBottom}px`};
`

const Loader = ({ headerOptions }: { headerOptions?: HeaderOptions }) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const themeColor = useSelector(
    ({ theme }: { theme: ThemeAttributes }) => theme.mode
  )
  const imageSrc = themeColor === 'light' ? LoadingImageLight : LoadingImageDark

  return (
    <Layout headerOptions={headerOptions}>
      <LoaderWrapper width={windowWidth} marginBottom={windowHeight / 5.5}>
        <Image src={imageSrc} width={55} height={55} resizeMode="contain" />
      </LoaderWrapper>
    </Layout>
  )
}

Loader.defaultProps = {
  headerOptions: {},
}

export default Loader
