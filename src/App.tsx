import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainContextProvider } from './components/context/MainContext'
import NavBar from './components/Navigation/navbar/NavBar'
import Main from './components/Main'
import Register from './components/auth_log/Register'
import Login from './components/auth_log/LogIn'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/user_profile/UserProfile'
import Footer from './components/Footer'
import UserInfo from './components/auth_log/UserInfo'
import MainProductPage from './components/Products/MainProductPage'
function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="home" element={<MainProductPage />} />
          </Route>
          <Route
            path="/myproduct"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/user_info" element={<UserInfo />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </MainContextProvider>
    </BrowserRouter>
  )
}

export default App
