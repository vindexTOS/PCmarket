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
    form: `flex flex-col gap-4`,
  }

  const handleLogAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await LogIn(email, password)
      navigate('home')
    } catch (error) {
      setErr('User Already Exists Or Input Feald Is Empty')
      setTimeout(() => {
        setErr('')
      }, 3000)
    }
  }

  return (
    <form className={style.form} onSubmit={handleLogAuth}>
      <input
        value={String(email)}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={String(password)}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      {err != '' && <p>{err}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login
