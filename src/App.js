import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MultiWordle from './pages/MultiWordle'
import Tournament from './pages/Tournament'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="tournament" element={<Tournament />} />
        <Route path="*" element={<MultiWordle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
