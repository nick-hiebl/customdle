import WORD_LIST from './scrabble_5.json'
import ANSWER_LIST from './possible_answers.json'

export const compare = (guess, actual) => {
  const len = actual.length
  const res = new Array(len).fill('no')
  const counts = {}
  for (let i = 0; i < len; i++) {
    if (actual[i] === guess[i]) {
      res[i] = 'exact'
    } else {
      counts[actual[i]] = (counts[actual[i]] || 0) + 1
    }
  }

  for (let i = 0; i < len; i++) {
    if (res[i] === 'no') {
      if (counts[guess[i]]) {
        counts[guess[i]] -= 1
        res[i] = 'partial'
      }
    }
  }

  return res
}

const WORD_SET = new Set()

for (const word of WORD_LIST) {
  WORD_SET.add(word)
}

for (const word of ANSWER_LIST) {
  WORD_SET.add(word)
}

export const isWord = (word) => {
  return WORD_SET.has(word)
}

export const chooseWords = (n) => {
  const results = []
  const options = ANSWER_LIST.length

  while (results.length < n) {
    const next = Math.floor(Math.random() * options)

    if (!results.includes(next)) {
      results.push(next)
    }
  }

  return results.map((n) => ANSWER_LIST[n])
}
