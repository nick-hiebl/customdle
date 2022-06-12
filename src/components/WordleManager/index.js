import React, { useState, useCallback, useEffect } from 'react'

import { compare, isWord } from '../../utils/GameLogic'

import Wordle from '../Wordle'
import Keyboard from '../Keyboard'

import FinishModal from './FinishModal'

const matches = (guesses, patterns, newGuess) => {
  const newPatterns = guesses.map((guess) => compare(guess, newGuess))

  const noMatch = newPatterns.some((newPattern, index) => {
    const oldPattern = patterns[index]

    return newPattern.some((value, innerIdx) => oldPattern[innerIdx] !== value)
  })

  return !noMatch
}

const WordleManager = ({ maxGuesses, secretWord, onFinish }) => {
  const width = secretWord.length
  const [currentGuess, setGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [patterns, setPatterns] = useState([])
  
  const [finishState, setFinishState] = useState(false)
  const [closed, setClosed] = useState(false)

  const newGuess = useCallback((guess) => {
    setGuesses((allSoFar) => allSoFar.concat(guess))
    setPatterns((allSoFar => allSoFar.concat(
      [compare(guess, secretWord)],
    )))
    if (guess === secretWord) {
      setFinishState('success')
    }
  }, [secretWord])

  useEffect(() => {
    if (guesses.length === maxGuesses) {
      setFinishState('failure')
    }
  }, [guesses, maxGuesses])

  const isValidGuess = useCallback((guess) => {
    // Word must be right length
    if (!guess.length === width) return false

    // Must have guesses left
    if (guesses.length >= maxGuesses) return false

    // Must be a real word
    if (!isWord(guess)) return false
  
    // Must satisfy hard-mode
    if (!matches(guesses, patterns, guess)) return false

    return true
  }, [guesses, maxGuesses, patterns, width])

  useEffect(() => {
    if (closed) {
      onFinish({ patterns })
    }
  }, [closed, onFinish, patterns])

  const gameProps = {
    maxGuesses,
    guesses,
    patterns,
    currentGuess,
    width,
  }

  return (
    <React.Fragment>
      <Wordle {...gameProps} />
      <Keyboard
        guesses={guesses}
        isValidGuess={isValidGuess}
        width={width}
        onChange={setGuess}
        onSubmit={newGuess}
        isDisabled={!!finishState}
      />
      {finishState && (
        <FinishModal
          {...gameProps}
          finishState={finishState}
          secretWord={secretWord}
          onClose={() => setClosed(true)}
        />
      )}
    </React.Fragment>
  )
}

export default WordleManager
