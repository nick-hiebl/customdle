import WORD_LIST from '../../scrabble_5.json'
import ANSWER_LIST from '../../possible_answers.json'

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