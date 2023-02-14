import React from 'react'
import LogForm from './LogForm'
import { UseMainContext } from '../context/MainContext'
function Register() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { Register } = context
  const style = {
    section: `w-[100vw] h-[100vh] flex items-center justify-center`,
  }
  return (
    <section className={style.section}>
      register
      <LogForm submit={Register} />
    </section>
  )
}

export default Register
