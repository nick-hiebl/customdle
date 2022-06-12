const LENGTH_BASE = [
  0, 11, 8, 5, 3, 2, 0,
]

const SCORE_FOR = {
  exact: 0,
  partial: -1,
  no: -2,
}

export const scoring = (patterns) => {
  const lengthBasedScore = LENGTH_BASE[patterns.length]

  const lastGuess = patterns[patterns.length - 1]

  const tileScore = lastGuess.reduce(
    (previous, current) => previous + SCORE_FOR[current],
    0,
  )

  return lengthBasedScore + tileScore
}
