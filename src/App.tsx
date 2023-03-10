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
import SingleProduct from './components/Products/SingleProductComponents/SingleProduct'

import ProductPage from './components/Products/productCategory/ProductPage'
import UserProfileMain from './components/user_profile/User_Products/UserProfileMain'
import UserRatingMain from './components/user_profile/UserRating/UserRatingMain'

import ProtectedPopUp from './components/user_profile/UserRating/ProtectedPopUp'
import AUTHpage from './components/auth_log/AUTHpage'

import Messages from './components/user_profile/Direct_Messages/messages'
import { UseProfileContext } from './components/context/ProfileContext'
import MainMessage from './components/user_profile/Direct_Messages/MainMessage'

import FavProduct from './components/Products/FavProduct'
function App() {
  const { RouteProductPage } = UseProductContext()
  const { dmPopUp } = UseProfileContext()
  return (
    <>
      <NavBar />
      <Routes>
        {/* main page */}
        <Route path="/" element={<Main />}>
          <Route path="" element={<MainProductPage />} />
          {/* pc category and sub categorys */}
          {RouteProductPage.map((routes, index) => {
            const {
              path,
              subPath1,
              subPath2,
              subPath3,
              subPath4,
              subPath5,
              subPath6,
              subPath7,
              subPath8,
              data,
            } = routes
            if (
              subPath1 &&
              subPath2 &&
              subPath3 &&
              subPath4 &&
              subPath5 &&
              subPath6 &&
              subPath7 &&
              subPath8
            ) {
              return (
                <Route
                  key={path + index}
                  path={path}
                  element={<ProductPage key={path + index} data={data} />}
                >
                  <Route
                    path={subPath1}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath2}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath3}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath4}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath5}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath6}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath7}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath8}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                </Route>
              )
            } else if (subPath1 && subPath2) {
              return (
                <Route
                  key={path + index}
                  path={path}
                  element={<ProductPage key={path + index} data={data} />}
                >
                  <Route
                    path={subPath1}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                  <Route
                    path={subPath2}
                    element={<ProductPage key={path + index} data={data} />}
                  />
                </Route>
              )
            } else {
              return (
                <Route
                  key={path + index}
                  path={path}
                  element={<ProductPage key={path + index} data={data} />}
                />
              )
            }
          })}
        </Route>
        {/* single product */}
        <Route
          path="/:productId"
          element={
            <div className="flex w-[100%] items-center justify-center bg-gray-100  ">
              <SingleProduct />
            </div>
          }
        />
        {/* adding product and user info  */}
        <Route
          path="/myproduct"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {/* UserProfileMain */}
        <Route path="/user/:UserProfileMainId" element={<UserProfileMain />} />
        {/* user rating */}
        <Route path="/messages/:UserProfileMainId" element={<MainMessage />} />
        {/*  fav product */}
        <Route path="/favourite" element={<FavProduct />} />
        {/* registration and sign in forms */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user_info" element={<UserInfo />} />
        <Route path="/auth" element={<AUTHpage />} />
      </Routes>
      {dmPopUp && <Messages />}
      <Footer />
    </>
  )
}

export default App
