import React, { useState } from 'react'
import { UseFormContext } from '../context/FormContext'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [err, setErr] = useState<string>('')
  const context = UseFormContext()
  if (!context) return null
  const { setUserAuth, user, navigate, LogIn } = context

  const style = {
    form: `flex flex-col gap-4 w-[100vw] h-[100vh] flex items-center justify-center`,
    inputDiv: `w-[14rem] h-[2.3rem] rounded-[20px] outline outline-2  flex items-center justify-center bg-white outline-yellow-300`,
    input: `bg-none outline-none`,
    btn: `w-[14rem] h-[2.3rem]  outline outline-2 outline-yellow-400 hover:outline-yellow-300 hover:text-blue-300 bg-white text-gray-400 rounded-[20px]`,
  }

  const handleLogAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await LogIn(email, password)
      navigate('/')
    } catch (error) {
      setErr('User Already Exists Or Input Feald Is Empty')
      setTimeout(() => {
        setErr('')
      }, 3000)
    }
  }

  return (
    <form className={style.form} onSubmit={handleLogAuth}>
      <div className={style.inputDiv}>
        {' '}
        <input
          className={style.input}
          value={String(email)}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
      </div>
      <div className={style.inputDiv}>
        {' '}
        <input
          className={style.input}
          value={String(password)}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
      </div>
      {err != '' && <p>{err}</p>}
      <button className={style.btn} type="submit">
        Sign In
      </button>
    </form>
  )
}

export default Login
