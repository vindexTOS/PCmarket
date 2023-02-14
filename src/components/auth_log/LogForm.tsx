import React, { useState } from 'react'
import { UseMainContext } from '../context/MainContext'

interface FormType {
  submit: (email: string, password: string) => void
}
const LogForm: React.FC<FormType> = ({ submit }) => {
  const context = UseMainContext()

  if (!context) {
    return null
  }
  const { user, navigate } = context

  const style = {
    form: `flex flex-col gap-4`,
  }
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [err, setErr] = useState<string>('')

  const handleLogAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await submit(email, password)
      navigate('/')
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

export default LogForm
