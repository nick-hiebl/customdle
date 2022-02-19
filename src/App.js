import React, { useCallback, useState, useEffect } from 'react'

import './App.css'

import Input from './Input'
import Settings from './Settings'
import GameComponent from './GameComponent'

import { chooseWords, isWord } from './Game'
import { GameContextProvider, DEFAULT_STATE } from './GameContext'
import { useNumGames } from './NumGamesInURL'

const LENGTH = 5

// const ALLOWED_GUESSES = 13

const isComplete = (guesses, secrets) => {
  return secrets.every((secret) => guesses.includes(secret))
}

const goodGoal = (secrets) => {
  if (secrets >= 7) {
    return secrets + 3
  }

  return {
    1: 6,
    2: 7,
    3: 8,
    4: 9,
    5: 9,
    6: 10,
  }[secrets]
}

function App() {
  const games = useNumGames()
  const [gameContext, setGameContext] = useState(DEFAULT_STATE)
  const [secrets, setSecrets] = useState(chooseWords(games))
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    setSecrets(chooseWords(games))
    setGuesses([])
  }, [games])

  const isFinished = isComplete(guesses, secrets)

  const allowedGuesses = Math.max(3, guesses.length + !isFinished)

  const onSubmit = (newGuess) => {
    if (guesses.length < allowedGuesses) {
      setGuesses(guesses.concat(newGuess))
    }
  }

  const isValidGuess = useCallback(
    (guess) => {
      if (guesses.length === allowedGuesses) {
        return false
      }

      const isValid = guess.length === LENGTH && isWord(guess)

      return isValid && !guesses.includes(guess)
    },
    [allowedGuesses, guesses],
  )

  useEffect(() => {
    if (isFinished) {
      setGameContext((context) => ({
        ...context,
        showCompleted: true,
      }))
    }
  }, [isFinished])

  const countWord = games === 1 ? '1 word' : `${games} words`

  return (
    <GameContextProvider value={gameContext}>
      <div className="App">
        <h1>Customdle</h1>
        <div className="info">
          You have unlimited guesses to find {countWord}.
          A good goal would be {goodGoal(games)} guesses.
          You've made {guesses.length} guesses so far.
          <br />
          Click on a section for some hints about available letters.
        </div>
        {isFinished && <h3>You found {countWord} in {guesses.length} guesses!</h3>}
        <Settings setSettings={setGameContext} />
        <div className="App-header">
          <div className="games-container">
            {secrets.map((secret, index) => (
              <GameComponent
                key={index}
                secretWord={secret}
                guesses={guesses}
                allowedGuesses={allowedGuesses}
                currentGuess={guess}
                length={LENGTH}
              />
            ))}
          </div>
          <Input
            length={LENGTH}
            onGuessChange={setGuess}
            onSubmit={onSubmit}
            isValidGuess={isValidGuess}
          />
        </div>
      </div>
    </GameContextProvider>
  );
}

export default App;
