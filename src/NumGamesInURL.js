import { useCallback, useState } from 'react'

import { useEventListener } from './useEventListener'

const getGamesFromURL = () => {
  const searchParams = new URLSearchParams(document.location.hash.replace('#', '?'))

  const suggestedWords = searchParams && parseInt(searchParams.get('w'))

  if (isNaN(suggestedWords)) {
    setGamesInURL(9)

    return 9
  }

  if (suggestedWords > 50) {
    return 50
  }

  return suggestedWords
}

const setGamesInURL = (games) => {
  const hash = `w=${games}`
  if (document.location.hash !== hash) {
    document.location.hash = hash
  }
}

export const useNumGames = () => {
  const [num, setNum] = useState(getGamesFromURL())

  const onHashChange = useCallback(() => {
    setNum(getGamesFromURL())
  }, [])

  useEventListener('hashchange', onHashChange)

  return num
}
