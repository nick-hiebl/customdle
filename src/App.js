import React from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'

import MultiWordle from './pages/MultiWordle'
import Tournament from './pages/Tournament'

import './App.css'

function Tester() {
  const params = useParams()

  return <h1>Params: {params.ext}</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":ext" elements={<Tester />} />
        <Route path="tournament" element={<Tournament />} />
        <Route path="*" element={<MultiWordle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
