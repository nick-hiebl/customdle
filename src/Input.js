import React, { useEffect, useState, useCallback } from 'react'

import { useEventListener } from './useEventListener'
import { useGameContext } from './GameContext'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const BACKSPACE = 'backspace'
const ENTER = 'enter'

const FIRST_ROW = 'qwertyuiop'
const SECOND_ROW = 'asdfghjkl'
const THIRD_ROW = 'zxcvbnm'

const Keyboard = ({ processKey }) => {
  const { showKeyboard = true } = useGameContext()

  if (!showKeyboard) {
    return null
  }

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {Array.from(FIRST_ROW).map((letter) => (
          <div
            key={letter}
            className="keyboard-letter"
            onClick={() => processKey(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="keyboard-row keyboard-row-2">
        {Array.from(SECOND_ROW).map((letter) => (
          <div
            key={letter}
            className="keyboard-letter"
            onClick={() => processKey(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        <div
          className="keyboard-letter keyboard-wide"
          onClick={() => processKey('backspace')}
        >
          ⌫
        </div>
        {Array.from(THIRD_ROW).map((letter) => (
          <div
            key={letter}
            className="keyboard-letter"
            onClick={() => processKey(letter)}
          >
            {letter}
          </div>
        ))}
        <div
          className="keyboard-letter keyboard-wide"
          onClick={() => processKey('enter')}
        >
          ✓
        </div>
      </div>
    </div>
  )
}

const Input = ({
  isValidGuess,
  length,
  onGuessChange,
  onSubmit,
}) => {
  const [guess, setGuess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const processKey = useCallback((key) => {
    if (LETTERS.includes(key)) {
      setGuess((current) => (
        (current + key).slice(0, length)
      ))
    } else if (key === BACKSPACE) {
      setGuess((current) => current.slice(0, current.length - 1))
    } else if (key === ENTER) {
      setSubmitting(true)
    }
  }, [length])

  const onKeyDown = useCallback((event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return
    }

    const key = event.key.toLowerCase()
    processKey(key)
  }, [processKey])

  useEventListener('keydown', onKeyDown)

  useEffect(() => {
    if (submitting) {
      if (isValidGuess(guess)) {
        onGuessChange('')
        onSubmit(guess)
        setGuess('')
      }

      setSubmitting(false)
    }
  }, [guess, isValidGuess, onGuessChange, onSubmit, submitting])

  useEffect(() => {
    onGuessChange(guess)
  }, [guess, onGuessChange])

  return (
    <div className="input">
      <div className="game-row game-row-input" style={{ fontSize: '1.8em' }}>
        {Array.from(guess.padEnd(length, ' ')).map((letter, index) => (
          <span key={index} className="letter" style={{
            color: 'white',
            backgroundColor: '#666',
          }}>
            {letter}
          </span>
        ))}
      </div>
      <Keyboard processKey={processKey} />
    </div>
  )
}

export default Input;
