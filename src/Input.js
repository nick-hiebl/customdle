import React, { useEffect, useState, useCallback } from 'react'
import { useEventListener } from './useEventListener'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const BACKSPACE = 'backspace'
const ENTER = 'enter'

const Input = ({
  isValidGuess,
  length,
  onGuessChange,
  onSubmit,
}) => {
  const [guess, setGuess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onKeyDown = useCallback((event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return
    }

    const key = event.key.toLowerCase()
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
      <div className="game-row">
        {Array.from(guess.padEnd(length, ' ')).map((letter, index) => (
          <span key={index} className="letter" style={{
            color: 'white',
            backgroundColor: '#666',
          }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Input;
