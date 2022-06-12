import React, { useCallback, useState, useEffect } from 'react'

import InfoBoard from '../../components/InfoBoard'
import WordleManager from '../../components/WordleManager'
import { scoring } from '../../utils/GameLogic'
import { save, read } from '../../utils/SaveManager'

import * as Styled from './styled'
import { useIsMobile } from './utils'
import SuccessModal from '../../components/SuccessModal'

const GAME = {
  id: 'default',
  words: [
    'hippo',
    'cards',
    'eagle',
    'piano',
    'snake',
    'tiger',
    'cello',
    'panda',
    'poker',
    'bugle',
    'chimp',
    'chess',
    'flute',
    'mouse',
  ],
}

const Tournament = () => {
  const [selectedPage, setPage] = useState('board')
  const [upTo, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [game, setGame] = useState(GAME)
  const [currentWord, setWord] = useState(game.words[0])
  const [previousWords, setPreviousWords] = useState([])

  const isMobile = useIsMobile()

  const onFinish = useCallback(({ patterns }) => {
    const extraScore = scoring(patterns)
    setScore((score) => score + extraScore)

    setWord(game.words[upTo + 1] || 'x'.repeat(game.words[0].length))
    setNumber(upTo + 1)
    setPreviousWords((words) => words.concat(currentWord))
  }, [currentWord, game, upTo])

  const refreshGame = useCallback(() => {
    setPage('board')
    setNumber(0)
    setScore(0)
    setGame(GAME)
    setWord(GAME.words[0])
    setPreviousWords([])

    save(`tournament--${GAME.id}`, {
      id: GAME.id,
      score: 0,
      upTo: 0,
    })
  }, [])

  useEffect(() => {
    if (upTo > 0) {
      save(`tournament--${game.id}`, {
        id: game.id,
        score,
        upTo,
      })
    }
  }, [game, score, upTo])

  useEffect(() => {
    // Load
    const key = `tournament--${game.id}`

    const data = read(key)

    if (data) {
      const { score, upTo } = data

      setNumber(upTo)
      setScore(score)
      setWord(game.words[upTo] || 'x'.repeat(game.words[0].length))
      setPreviousWords(game.words.slice(0, upTo))
    }

  }, [game])

  return (
    <Styled.Page>
      {isMobile && (
        <Styled.PageSelector>
          <Styled.Button
            isSelected={selectedPage === 'board'}
            onClick={() => setPage('board')}
          >
            Game
          </Styled.Button>
          <Styled.Button
            isSelected={selectedPage === 'words'}
            onClick={() => setPage('words')}
          >
            Words {previousWords.length > 0 && `(${previousWords.length})`}
          </Styled.Button>
        </Styled.PageSelector>
      )}
      <Styled.Text>
        There are 14 words, in 3 categories. One with 7 words, one with 4
        words, and one with 3 words.
      </Styled.Text>
      <Styled.Container>
        <Styled.Column isHidden={selectedPage !== 'board' && isMobile}>
          <Styled.Heading>#{upTo + 1}</Styled.Heading>
          <WordleManager
            onFinish={onFinish}
            secretWord={currentWord}
            maxGuesses={6}
            key={`${currentWord}-${score}`}
          />
        </Styled.Column>
        <Styled.Column isHidden={selectedPage !== 'words' && isMobile}>
          <InfoBoard
            previousWords={previousWords}
            score={score}
            refreshGame={refreshGame}
          />
        </Styled.Column>
      </Styled.Container>
      {upTo >= game.words.length && (
        <SuccessModal
          score={score}
          previousWords={previousWords}
          refreshGame={refreshGame}
        />
      )}
    </Styled.Page>
  )
}

export default Tournament
