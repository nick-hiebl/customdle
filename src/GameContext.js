import React, { useContext } from 'react'

export const DEFAULT_STATE = {
  length: 5,
  games: 9,
  showCompleted: true,
  numGames: 9,
}

const GameContext = React.createContext(DEFAULT_STATE)

export const GameContextProvider = GameContext.Provider

export const useGameContext = () => {
  return useContext(GameContext)
}
