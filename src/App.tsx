import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainContextProvider } from './components/context/MainContext'
import NavBar from './components/Navigation/navbar/NavBar'
import Main from './components/Main'

function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </MainContextProvider>
    </BrowserRouter>
  )
}

export default App
