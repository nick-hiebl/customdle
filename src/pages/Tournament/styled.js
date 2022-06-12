import styled, { css } from 'styled-components'

export const Page = styled.div``

export const Text = styled.div`
  color: white;
  text-align: center;
  padding-top: 16px;
`

export const Heading = styled.h2`
  text-align: center;
`

export const Container = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
`

export const Column = styled.div`
  ${({ isHidden }) => isHidden ? css`display: none;` : null}
  padding: 24px;
  width: 49%;
  justify-content: center;
  flex: 1;

  color: white;
`

export const PageSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export const Button = styled.button`
  background-color: ${({ isSelected }) => isSelected ? '#ccf2' : '#fff1'};
  border: none;
  height: 3em;
  color: white;
  width: 50%;
`
