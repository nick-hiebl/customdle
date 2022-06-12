import styled from 'styled-components'

export const Blanket = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;

  background-color: hsla(0, 0%, 0%, 0.4);
  z-index: 800;
`

export const ModalBody = styled.div`
  width: calc(min(400px, 90vw - 48px));
  background-color: white;
  z-index: 900;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  margin: 0 auto;

  padding: 24px;
  border-radius: 3px;
  background-color: #1a1a1a;
  color: white;
`

export const ModalHeading = styled.h2`
  margin-top: 0;
`

export const Para = styled.p``

export const ButtonRow = styled.div`
  display: flex;
  justify-content: end;
`

export const Button = styled.button`
  border: none;
  border-radius: 3px;
  background: #132abd;
  color: white;
  padding: 12px 16px;
  font-weight: bold;
  font-size: 1em;
  font-family: sans-serif;
  cursor: pointer;
`
