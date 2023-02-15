import { Modal, ModalProps } from 'antd'
import * as Styled from './CustomModal.Styled'

export type CustomModalProps = Omit<ModalProps, 'destroyOnClose'>

export default function CutsomModal({
  children,
  okText = '예',
  cancelText = '취소',
  maskClosable = false,
  ...modalProps
}: CustomModalProps) {
  return (
    <Modal
      okText={okText}
      cancelText={cancelText}
      destroyOnClose={true}
      maskClosable={maskClosable}
      {...modalProps}
    >
      <Styled.Body>{children}</Styled.Body>
    </Modal>
  )
}
