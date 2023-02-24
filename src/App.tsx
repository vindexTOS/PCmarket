import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FormContextProvider } from './components/context/FormContext'
import { ProductContextProvider } from './components/context/ProductContext'
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
import PC from './components/Products/productCategory/PC'
import LAPTOP from './components/Products/productCategory/LAPTOP'
import COMPONENTS from './components/Products/productCategory/COMPONENTS'
import PHONE from './components/Products/productCategory/PHONE'
import ELECTRONICS from './components/Products/productCategory/ELECTRONICS'
function App() {
  return (
    <BrowserRouter>
      <FormContextProvider>
        <ProductContextProvider>
          <NavContextProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Main />}>
                <Route path="" element={<MainProductPage />} />
                <Route path="/desktop" element={<PC />} />
                <Route path="/laptop" element={<LAPTOP />} />
                <Route path="/components" element={<COMPONENTS />} />
                <Route path="/phone" element={<PHONE />} />
                <Route path="/electronics" element={<ELECTRONICS />} />
              </Route>
              <Route path="/:productId" element={<SingleProduct />} />
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
              <Route path="/user_info" element={<UserInfo />} />
            </Routes>
            <Footer />
          </NavContextProvider>
        </ProductContextProvider>
      </FormContextProvider>
    </BrowserRouter>
  )
}

export default App
