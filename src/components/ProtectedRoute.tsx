import React from 'react'
import { UseFormContext } from './context/FormContext'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const context = UseFormContext()
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
