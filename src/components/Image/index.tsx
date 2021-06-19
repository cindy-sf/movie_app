import React from 'react'
import { ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

const CustomImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: ${(props: { resizeMode: string }) => `${props.resizeMode}`};
  display: flex;
  justify-content: center;
  align-content: flex-end;
`

const Wrapper = styled.View`
  height: ${(props: { height: number }) => props.height}px;
  width: ${(props: { width: number }) => props.width}px;
`

interface Props {
  src: ImageSourcePropType
  height: number
  width: number
  resizeMode?: 'cover' | 'contain'
}

const Image = ({
  src,
  height,
  width,
  resizeMode = 'contain',
}: Props): React.ReactElement => (
  <Wrapper height={height} width={width}>
    <CustomImage source={src} resizeMode={resizeMode} />
  </Wrapper>
)

Image.defaultProps = {
  resizeMode: 'contain',
}

export default Image
