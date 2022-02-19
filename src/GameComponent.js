import React, { useEffect, useMemo, useState } from 'react'

import HintSection from './HintSection'

import { compare } from './Game'
import { useGameContext } from './GameContext'

const processPatterns = (guesses, secretWord) => {
  return guesses.map((guess) => compare(guess, secretWord))
}

const usePatterns = (guesses, secretWord) => {
  return useMemo(
    () => processPatterns(guesses, secretWord),
    [guesses, secretWord],
  )
}

const COLOR_MAP = {
  exact: 'green',
  partial: '#db3',
  no: '#444',
}

const Row = ({ guess, pattern }) => {
  return (
    <div className="game-row">
      {Array.from(guess).map((letter, index) => (
        <span key={index} className="letter" style={{
          backgroundColor: COLOR_MAP[pattern[index]],
        }}>
          {letter}
        </span>
      ))}
    </div>
  )
}

const EmptyRow = ({ length }) => {
  return (
    <div className="game-row">
      {Array(length).fill(0).map((_, index) => (
        <span key={index} className="letter" style={{
          backgroundColor: '#666',
        }} />
      ))}
    </div>
  )
}

const CurrentGuess = ({ currentGuess, length }) => {
  return (
    <div className="game-row">
      {Array(length).fill(0).map((_, index) => (
        <span key={index} className="letter" style={{
          backgroundColor: '#666',
        }}>{currentGuess[index] || null}</span>
      ))}
    </div>
  )
}

const GameComponent = ({
  guesses,
  secretWord,
  allowedGuesses,
  currentGuess,
  length,
}) => {
  const [showHints, setShowHints] = useState(false)

  const patterns = usePatterns(guesses, secretWord)

  const guessedAfter = guesses.indexOf(secretWord)
  const hasGuessed = guessedAfter >= 0
  const guessedOn = guessedAfter + 1

  useEffect(() => {
    if (hasGuessed) {
      setShowHints(false)
    }
  }, [hasGuessed])

  const showCurrentGuess = guesses.length < allowedGuesses && !hasGuessed

  const shownGuesses = hasGuessed ? guessedOn : guesses.length
  const numEmpty = allowedGuesses - shownGuesses - showCurrentGuess
  const emptyRows = new Array(numEmpty).fill('yes')

  const { showCompleted } = useGameContext()

  if (hasGuessed && !showCompleted) {
    return null
  }

  return (
    <div className="game" onClick={() => setShowHints((current) => !current)}>
      {guesses.slice(0, shownGuesses).map((guess, index) => (
        <Row key={index} guess={guess} pattern={patterns[index]} />
      ))}
      {showCurrentGuess && (
        <CurrentGuess currentGuess={currentGuess} length={length} />
      )}
      {emptyRows.map((_, index) => (
        <EmptyRow key={index} length={length} />
      ))}
      {showHints && (
        <HintSection guesses={guesses} patterns={patterns} length={length} />
      )}
    </div>
  )
}

export default GameComponent
