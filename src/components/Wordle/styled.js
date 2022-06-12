import styled from 'styled-components'

export const Board = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.5em;
`

export const Row = styled.div`
  display: flex;
`

const COLOR_MAP = {
  exact: 'green',
  partial: '#db3',
  no: '#333',
}

export const Letter = styled.div`
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5em;
  margin: 0.1em;
  border-radius: 2px;
  text-transform: capitalize;
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: ${({ kind }) => COLOR_MAP[kind] || '#666'};
`
