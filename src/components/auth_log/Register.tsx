import React, { useState } from 'react'
import { UseMainContext } from '../context/MainContext'

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [err, setErr] = useState<string>('')
  const context = UseMainContext()
  if (!context) return null
  const { setUserAuth, user, navigate, Register } = context

  const style = {
    form: `flex flex-col gap-4`,
  }

  const handleLogAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await Register(email, password)
      navigate('/user_info')
      console.log(user)
      setUserAuth(true)
    } catch (error) {
      setErr('User Already Exists Or Input Feald Is Empty')
      setTimeout(() => {
        setErr('')
      }, 3000)
    }
  }
  // ეს ფორმა შეცვალე და ცალ ცალკე გაუკეთი რეგისტრაციას და შესვლას
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

export default Register
