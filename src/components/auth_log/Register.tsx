import React, { useState } from 'react'
import { UseFormContext } from '../context/FormContext'

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [passwordCheck, setPasswordCheck] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [err, setErr] = useState<string>('')
  const context = UseFormContext()
  if (!context) return null
  const { setUserAuth, user, navigate, Register } = context

  const style = {
    form: `flex flex-col gap-4 w-[100vw] h-[100vh] flex items-center justify-center`,
    inputDiv: `w-[14rem] h-[2.3rem] rounded-[20px] outline outline-2  flex items-center justify-center bg-white`,
    input: `bg-none outline-none`,
    btn: `w-[14rem] h-[2.3rem]  outline outline-2 outline-yellow-400 hover:outline-yellow-300 hover:text-blue-300 bg-white text-gray-400 rounded-[20px]`,
  }

  const handleLogAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await Register(email, password, passwordCheck)
      if (password == passwordCheck && email) {
        navigate('/user_info')
        console.log(user)
        setUserAuth(true)
      }
      if (password !== passwordCheck) {
        setErr('Password does not match')
      }
      setTimeout(() => {
        setErr('')
      }, 3000)
    } catch (error) {
      setErr('User Already Exists Or Input Feald Is Empty')

      setTimeout(() => {
        setErr('')
      }, 3000)
    }
  }
  return (
    <form className={style.form} onSubmit={handleLogAuth}>
      {/* <h1 onClick={() => console.log(user)}>sadsadsa</h1> */}
      <div
        className={`${style.inputDiv} ${
          err === 'User Already Exists Or Input Feald Is Empty'
            ? 'outline-red-600'
            : 'outline-yellow-300'
        }`}
      >
        <input
          className={style.input}
          value={String(email)}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
      </div>
      <div
        className={`${style.inputDiv} ${
          err === 'Password does not match'
            ? 'outline-red-600'
            : 'outline-yellow-300'
        }`}
      >
        <input
          onChange={(e) => setPasswordCheck(e.target.value)}
          className={style.input}
          value={String(passwordCheck)}
          type="password"
          placeholder="password"
        />
      </div>
      <div
        className={`${style.inputDiv} ${
          err === 'Password does not match'
            ? 'outline-red-600'
            : 'outline-yellow-300'
        }`}
      >
        <input
          className={style.input}
          value={String(password)}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
      </div>
      {err != '' && <p className="text-red-500">{err}</p>}
      <button className={style.btn} type="submit">
        Register
      </button>
    </form>
  )
}

export default Register
