import styled from 'styled-components'

export const Board = styled.div`
  @media only screen and (min-width: 600px) {
    padding-bottom: 400px;
  }
`

export const Text = styled.p``

export const Span = styled.span`
  margin-right: 8px;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const List = styled.div`
  border-radius: 3px;
  padding: 16px;
  padding-bottom: 0px;
  max-width: 200px;
  margin-bottom: 24px;
  width: 200px;
  margin-right: 24px;
  background-color: #242424;

  box-shadow: 0 1px 12px -4px #000f;

  display: flex;
  flex-direction: column;
`

export const ListItem = styled.div`
  border-radius: 3px;
  padding: 4px;
  margin-bottom: 16px;
  background-color: #343434;
  box-shadow: 0 1px 8px -2px #0009;

  text-align: center;
  font-size: 1.5em;
`

export const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 16px;
  background-color: transparent;
  margin-bottom: ${(props) => props.noSpacing ? '0' : '16px'};
  color: white;
  font-size: 1.5em;
  display: inline;
  &:hover {
    background-color: #fff3;
  }

  line-height: 100%;
`
