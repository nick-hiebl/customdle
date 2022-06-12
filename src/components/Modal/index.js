import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'

import { useEventListener } from '../../utils/useEventListener'

import * as Styled from './styled'

const Portal = ({ children, portKey }) => {
  return ReactDOM.createPortal(children, document.body, portKey)
}

const ModalBody = ({ children }) => {
  return (
    <Styled.ModalBody>
      {children}
    </Styled.ModalBody>
  )
}

const Modal = ({ children, onClose }) => {
  const onKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEventListener('keydown', onKeyDown)

  return (
    <Portal portKey="modal">
      <React.Fragment>
        <Styled.Blanket onClick={onClose} />
        <ModalBody>
          {children}
        </ModalBody>
      </React.Fragment>
    </Portal>
  )
}

export const ModalHeading = Styled.ModalHeading
export const Para = Styled.Para
export const ButtonRow = Styled.ButtonRow
export const ModalButton = Styled.Button

export default Modal
