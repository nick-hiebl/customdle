import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MultiWordle from './pages/MultiWordle'

import './App.css'

function App() {
  return (
    <BrowserRouter basename="/customdle">
      <Routes>
        <Route path="*" element={<MultiWordle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
