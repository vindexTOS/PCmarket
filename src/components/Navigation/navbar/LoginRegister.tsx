import React from 'react'
import { Link } from 'react-router-dom'
function LoginRegister() {
  return (
    <div>
      {' '}
      <Link to="/register" className="text-black z-50">
        Register
      </Link>
      <Link className="text-black z-50" to="/login">
        Login
      </Link>
    </div>
  )
}

export default LoginRegister
