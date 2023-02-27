import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FormContextProvider } from './components/context/FormContext'
import {
  ProductContextProvider,
  UseProductContext,
} from './components/context/ProductContext'
import { NavContextProvider } from './components/context/NavContext'
import NavBar from './components/Navigation/navbar/NavBar'
import Main from './components/Main'
import Register from './components/auth_log/Register'
import Login from './components/auth_log/LogIn'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/user_profile/UserProfile'
import Footer from './components/Footer'
import UserInfo from './components/auth_log/UserInfo'
import MainProductPage from './components/Products/MainProductPage'
import SingleProduct from './components/Products/SingleProduct'

import ProductPage from './components/Products/productCategory/ProductPage'
function App() {
  const { RouteProductPage } = UseProductContext()
  return (
    <>
      <NavBar />
      <Routes>
        {/* main page */}
        <Route path="/" element={<Main />}>
          <Route path="" element={<MainProductPage />} />
          {/* pc category and sub categorys */}
          {RouteProductPage.map((routes) => {
            const { path, subPath1, subPath2, data } = routes
            if (subPath1 && subPath2) {
              return (
                <Route path={path} element={<ProductPage data={data} />}>
                  <Route
                    path={subPath1}
                    element={<ProductPage data={data} />}
                  />
                  <Route
                    path={subPath2}
                    element={<ProductPage data={data} />}
                  />
                </Route>
              )
            } else {
              return <Route path={path} element={<ProductPage data={data} />} />
            }
          })}
        </Route>
        {/* single product */}
        <Route path="/:productId" element={<SingleProduct />} />
        {/* adding product and user info  */}
        <Route
          path="/myproduct"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {/* registration and sign in forms */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user_info" element={<UserInfo />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
