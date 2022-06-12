import React, { useCallback, useEffect, useMemo, useState } from 'react'

import * as Styled from './styled'
import { useEventListener } from '../../utils/useEventListener'

// Split into an array so values like 'abc' aren't considered part of includes
const LETTERS = Array.from('abcdefghijklmnopqrstuvwxyz')
const BACKSPACE = 'backspace'
const ENTER = 'enter'

// Split into array for mapping purposes
const FIRST_ROW = Array.from('qwertyuiop')
const SECOND_ROW = Array.from('asdfghjkl')
const THIRD_ROW = Array.from('zxcvbnm')

const BaseKey = ({ children, component, isUsed, letter, processKey }) => {
  const Comp = component || Styled.Key

  return (
    <Comp isUsed={isUsed} onClick={() => processKey(letter)}>
      {children}
    </Comp>
  )
}

const Key = ({ guesses, letter, processKey }) => {
  const keyUsed = useMemo(
    () => guesses.some((guess) => guess.includes(letter)),
    [guesses, letter],
  )

  return (
    <Styled.Key isUsed={keyUsed} onClick={() => processKey(letter)}>
      {letter}
    </Styled.Key>
  )
}

const Keyboard = ({ guesses, processKey }) => {
  return (
    <Styled.Keyboard>
      <Styled.KeyboardRow>
        {FIRST_ROW.map((letter) => (
          <Key
            key={letter}
            guesses={guesses}
            letter={letter}
            processKey={processKey}
          />
        ))}
      </Styled.KeyboardRow>
      <Styled.KeyboardRow isLeftPadded>
        {SECOND_ROW.map((letter) => (
          <Key
            key={letter}
            guesses={guesses}
            letter={letter}
            processKey={processKey}
          />
        ))}
      </Styled.KeyboardRow>
      <Styled.KeyboardRow>
        <BaseKey
          component={Styled.WideKey}
          letter={BACKSPACE}
          processKey={processKey}
        >
         ⌫
        </BaseKey>
        {THIRD_ROW.map((letter) => (
          <Key
            key={letter}
            guesses={guesses}
            letter={letter}
            processKey={processKey}
          />
        ))}
        <BaseKey
          component={Styled.SemiWideKey}
          letter={ENTER}
          processKey={processKey}
        >
          ✓
        </BaseKey>
      </Styled.KeyboardRow>
    </Styled.Keyboard>
  )
}

const KeyboardControl = ({
  guesses,
  isValidGuess,
  width,
  onChange,
  onSubmit,
  isDisabled,
}) => {
  const [guess, setGuess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const processKey = useCallback((key) => {
    if (isDisabled) {
      return
    }

    if (LETTERS.includes(key)) {
      setGuess((current) => (
        (current + key).slice(0, width)
      ))
    } else if (key === BACKSPACE) {
      setGuess((current) => current.slice(0, current.length - 1))
    } else if (key === ENTER) {
      setSubmitting(true)
    }
  }, [isDisabled, width])

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
        onChange('')
        onSubmit(guess)
        setGuess('')
      }

      setSubmitting(false)
    }
  }, [guess, isValidGuess, onChange, onSubmit, submitting])

  useEffect(() => {
    onChange(guess)
  }, [guess, onChange])

  return (
    <Styled.Input>
      <Keyboard guesses={guesses} processKey={processKey} />
    </Styled.Input>
  )
}

export default KeyboardControl
