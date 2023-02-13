import { CSSProperties, PropsWithChildren } from 'react'
import * as Styled from './FlexBox.Styled'

export interface FlexBoxProps {
  className?: string
  flexDirection?: CSSProperties['flexDirection']
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  gap?: CSSProperties['gap']
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}

/**
 * @description 'dipslay:flex' 한 div 컴포넌트
 */
export default function FlexBox({
  children,
  className,
  ...flexBoxProps
}: PropsWithChildren<FlexBoxProps>) {
  return (
    <Styled.Frame className={className} {...flexBoxProps}>
      {children}
    </Styled.Frame>
  )
}
