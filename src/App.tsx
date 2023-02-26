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
// sub categorys
// sub category for PC
import UsedPc from './components/Products/subCategory/UsedPc'
import NewPc from './components/Products/subCategory/NewPc'
// sub category for lap top
import NewLaptop from './components/Products/subCategory/NewLaptop'
import UsedLaptop from './components/Products/subCategory/UsedLaptop'
function App() {
  return (
    <BrowserRouter>
      <FormContextProvider>
        <ProductContextProvider>
          <NavContextProvider>
            <NavBar />
            <Routes>
              {/* main page */}
              <Route path="/" element={<Main />}>
                <Route path="" element={<MainProductPage />} />
                {/* pc category and sub categorys */}
                <Route path="/desktop" element={<PC />}>
                  <Route path="used-pc" element={<UsedPc />} />
                  <Route path="new-pc" element={<NewPc />} />
                </Route>
                {/* laptop category and sub categorys */}
                <Route path="/laptop" element={<LAPTOP />}>
                  <Route path="used-laptop" element={<UsedLaptop />} />
                  <Route path="new-laptop" element={<NewLaptop />} />
                </Route>
                {/* compnent category and sub categorys */}
                <Route path="/components" element={<COMPONENTS />} />
                {/* phone category and sub categorys */}
                <Route path="/phone" element={<PHONE />} />
                {/* electronic category and sub categorys */}
                <Route path="/electronics" element={<ELECTRONICS />} />
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
          </NavContextProvider>
        </ProductContextProvider>
      </FormContextProvider>
    </BrowserRouter>
  )
}

export default App
