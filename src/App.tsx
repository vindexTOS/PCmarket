import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainContextProvider } from './components/context/MainContext'
import NavBar from './components/Navigation/navbar/NavBar'
import Main from './components/Main'
import Register from './components/auth_log/Register'
import Login from './components/auth_log/LogIn'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/user_profile/UserProfile'
function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/myproduct"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainContextProvider>
    </BrowserRouter>
  )
}

export default App
