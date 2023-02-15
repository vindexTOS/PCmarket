import React from 'react'
import { UseMainContext } from '../components/context/MainContext'
export interface ActionType {
  actiontype: string
  children: React.ReactNode
}
const ArrowBtn: React.FC<ActionType> = ({ children, actiontype }) => {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const style = {
    btn: `text-[5rem] h-[100%] opacity-40 z-10 hover:bg-gray-400 hover:text-white text-blue-400 rounded-[20px] `,
  }
  const { dispatch } = context
  return (
    <button
      className={style.btn}
      onClick={() => dispatch({ type: `${actiontype}` })}
    >
      {children}
    </button>
  )
}

export default ArrowBtn
