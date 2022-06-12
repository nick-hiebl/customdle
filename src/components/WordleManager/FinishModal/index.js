import React from 'react'

import { scoring } from '../../../utils/GameLogic'

import Modal, { ButtonRow, ModalButton, ModalHeading, Para } from '../../Modal'
import Wordle from '../../Wordle'

const ScoreExplanation = ({ finishState, patterns }) => {
  const score = scoring(patterns)

  return (
    <Para>
      You got {score} points.
    </Para>
  )
}

const FinishModal = (props) => {
  const { finishState, onClose, secretWord, ...gameProps } = props
  return (
    <Modal>
      <ModalHeading>
        {finishState === 'success' && (
          'You got the word!'
        )}
        {finishState === 'failure' && (
          "You didn't get the word"
        )}
      </ModalHeading>
      <Para>
        The word was "{secretWord}"
      </Para>
      <ScoreExplanation finishState={finishState} patterns={props.patterns} />
      <Wordle {...gameProps} currentGuess="" />
      <ButtonRow>
        <ModalButton onClick={onClose}>
          Close
        </ModalButton>
      </ButtonRow>
    </Modal>
  )
}

export default FinishModal
