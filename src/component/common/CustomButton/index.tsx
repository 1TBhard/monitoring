import { ButtonProps } from 'antd'
import * as Styled from './CustomButton.Styled'

interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  label?: string
}

export default function CustomButton({
  label,
  ...restButtonProps
}: CustomButtonProps) {
  return <Styled.Button {...restButtonProps}>{label}</Styled.Button>
}
