import React, { useState } from 'react'
import { UseFormContext } from '../context/FormContext'

interface FormType {
  submit: (email: string, password: string) => void
  path: string
}
const LogForm: React.FC<FormType> = ({ submit, path }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [err, setErr] = useState<string>('')
  const context = UseFormContext()
  if (!context) return null
  const { setUserAuth, user, navigate } = context

  const style = {
    form: `flex flex-col gap-4`,
  }

  const handleLogAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await submit(email, password)
      navigate(path)
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

export default LogForm
