import * as Styled from './styled'

const Row = ({ guess, pattern }) => (
  <Styled.Row>
    {Array.from(guess).map((letter, index) => (
      <Styled.Letter key={index} kind={pattern[index]}>
        {letter}
      </Styled.Letter>
    ))}
  </Styled.Row>
)

const CurrentRow = ({ currentGuess, width }) => (
  <Styled.Row>
    {Array(width).fill(0).map((_, index) =>
      index < currentGuess.length
        ? <Styled.Letter key={index}>{currentGuess[index]}</Styled.Letter>
        : <Styled.Letter key={index}>{' '}</Styled.Letter>
    )}
  </Styled.Row>
)

const EmptyRow = ({ width }) => (
  <Styled.Row>
    {Array(width).fill(0).map((_, index) => (
      <Styled.Letter key={index}>{' '}</Styled.Letter>
    ))}
  </Styled.Row>
)

const Wordle = ({
  guesses,
  patterns,
  currentGuess,
  maxGuesses,
  width,
}) => (
  <Styled.Board>
    {Array(maxGuesses).fill(0).map((_, index) =>
      index < patterns.length
        ? (
            <Row key={index} guess={guesses[index]} pattern={patterns[index]} />
          )
        : index === patterns.length
          ? (
              <CurrentRow
                key={index}
                currentGuess={currentGuess}
                width={width}
              />
            )
          : <EmptyRow key={index} width={width} />
    )}
  </Styled.Board>
)

export default Wordle
