import React, { useMemo } from 'react'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

const makeLetterMap = (guesses, length, patterns) => {
  const known = new Array(length).fill(undefined)
  const included = new Set()
  const excluded = new Set()

  guesses.forEach((guess, guessIndex) => {
    const pattern = patterns[guessIndex]
    Array.from(guess).forEach((letter, index) => {
      if (pattern[index] === 'exact') {
        known[index] = letter
        included.add(letter)
      } else if (pattern[index] === 'partial') {
        included.add(letter)
      } else {
        excluded.add(letter)
      }
    })
  })

  const letters = Array.from(LETTERS).map((letter) => {
    if (included.has(letter)) {
      return {
        letter,
        kind: 'included',
      }
    } else if (excluded.has(letter)) {
      return {
        letter,
        kind: 'excluded',
      }
    } else {
      return {
        letter,
        kind: 'unknown',
      }
    }
  })

  return {
    known,
    letters,
  }
}

const useLetterMap = (guesses, length, patterns) => {
  return useMemo(
    () => makeLetterMap(guesses, length, patterns),
    [guesses, length, patterns],
  )
}

const COLOR_MAP = {
  included: 'blue',
  excluded: 'red',
  unknown: '#666',
}

const HintSection = ({
  guesses,
  length,
  patterns,
}) => {
  const { known, letters } = useLetterMap(guesses, length, patterns)

  return (
    <div className="hint-section">
      <div className="game-row">
        {known.map((letter, index) => (
          letter ? (
            <span key={index} className="letter" style={{
              backgroundColor: 'green',
            }}>{letter}</span>
          ) : (
            <span key={index} className="letter" style={{
              backgroundColor: '#666'
            }} />
          )
        ))}
      </div>
      <div className="letter-jumble">
        {letters.map(({ letter, kind }, index) => ( kind !== 'excluded' &&
          <span key={index} className="letter" style={{
            backgroundColor: COLOR_MAP[kind],
          }}>{letter}</span>
        ))}
      </div>
    </div>
  )
}

export default HintSection
