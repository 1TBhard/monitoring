import { Layout as OriginLayout } from 'antd'
import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const Title = styled.h1`
  text-align: center;
  margin: 0;
`

export const Frame = styled(OriginLayout)`
  height: 100vh;
  margin: 0 auto;
`

export const Header = styled(OriginLayout.Header)`
  background: #fff !important;
`

export const Slider = styled(OriginLayout.Content)`
  background: #fff;
  max-width: 368px;
  height: 100%;
`

export const Content = styled(OriginLayout.Content)`
  height: 100%;
`

export const Footer = styled(OriginLayout.Footer)``
