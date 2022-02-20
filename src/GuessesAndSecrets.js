import { useState, useCallback, useEffect } from 'react'

import { useNumGames } from './NumGamesInURL'
import { chooseWords } from './Game'

const GUESSES = 'guesses'
const SECRETS = 'secrets'

const readData = (key) => {
  try {
    const dataJson = localStorage.getItem(key)
  
    if (!dataJson) {
      return []
    }
  
    return JSON.parse(dataJson)
  } catch {
    console.warn(`Could not read ${key} from local storage`)
    return []
  }
}


const writeData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.warn(`Could not save ${key} to local storage`)
  }
}

export const useSecretsAndGuesses = () => {
  const games = useNumGames()

  const [guesses, setGuesses] = useState([])

  const [secrets, setSecrets] = useState([])

  useEffect(() => {
    setGuesses(readData(GUESSES))
    
    const oldSecrets = readData(SECRETS)
    if (oldSecrets.length !== games) {
      setSecrets(chooseWords(games))
    } else {
      setSecrets(oldSecrets)
    }
  }, [games])

  const reset = useCallback(() => {
    setSecrets(chooseWords(games))
    setGuesses([])
  }, [games])

  useEffect(() => {
    if (games !== secrets.length) {
      reset()
    }
  }, [games, reset, secrets])

  const addGuess = useCallback((newGuess) => {
    setGuesses((guesses) => guesses.concat(newGuess))
  }, [])

  useEffect(() => {
    writeData(GUESSES, guesses)
  }, [guesses])

  useEffect(() => {
    writeData(SECRETS, secrets)
  }, [secrets])

  return {
    games,
    guesses,
    secrets,
    addGuess,
    reset,
  }
}
