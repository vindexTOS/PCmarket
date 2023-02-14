import React from 'react'
import LogForm from './LogForm'
import { UseMainContext } from '../context/MainContext'
function Login() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { LogIn } = context
  const style = {
    section: `w-[100vw] h-[100vh] flex items-center justify-center`,
  }
  return (
    <section className={style.section}>
      log in
      <LogForm submit={LogIn} />
    </section>
  )
}

export default Login
