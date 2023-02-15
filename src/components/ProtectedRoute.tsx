import React from 'react'
import { UseMainContext } from '../components/context/MainContext'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { user } = context
  if (!user) {
    return <Navigate to="/" />
  } else {
    return children
  }
}

export default ProtectedRoute
