import styled from 'styled-components'

export const Key = styled.button`
  border: none;
  border-radius: 2px;
  font-size: inherit;
  text-align: center;
  width: 2em;
  height: 3em;
  line-height: 2em;
  text-transform: capitalize;
  cursor: pointer;

  background-color: ${({ isUsed }) => isUsed ? '#bbb' : '#666'};
  color: ${({ isUsed }) => isUsed ? 'black' : 'white'};
  margin: 0.2em;
  font-weight: bold;
  margin: 2px;
`

export const Keyboard = styled.div``

export const KeyboardRow = styled.div`
  display: flex;
  flex-direction: row;

  padding-left: ${({ isLeftPadded }) => isLeftPadded ? '0.7em' : '0'};
`

export const WideKey = styled(Key)`
  width: 3.8em;
`

export const SemiWideKey = styled(Key)`
  width: 2.4em;
  background-color: green;
`

export const Input = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: #1a1a1a;
  padding: 8px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.65em;
  border-radius: 16px 16px 0 0;
`
