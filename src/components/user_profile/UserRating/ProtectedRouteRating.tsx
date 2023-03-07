import React from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import { Link, useNavigate } from 'react-router-dom'
const ProtectedRouteRating = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const { user, lang } = UseFormContext()
  if (user) {
    return children
  } else {
    return <Link to="/"></Link>
  }
}

export default ProtectedRouteRating
