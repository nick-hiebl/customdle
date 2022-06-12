import React from 'react'
import Modal, { ButtonRow, ModalButton, ModalHeading, Para } from '../Modal'

const SuccessModal = ({ score, previousWords, refreshGame }) => {
  return (
    <Modal>
      <ModalHeading>You finished!</ModalHeading>
      <Para>You got {score} point{score === 1 ? '' : 's'}.</Para>
      <Para>The words were:</Para>
      <ul>
        {previousWords.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
      <ButtonRow>
        <ModalButton onClick={refreshGame}>Reset</ModalButton>
      </ButtonRow>
    </Modal>
  )
}

export default SuccessModal
