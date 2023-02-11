import React from 'react'
import { Photodata } from '../utils/data/Photos'
import { UseMainContext } from './context/MainContext'
function Slider() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { state, dispatch } = context
  const { img } = Photodata[state.index]
  const style = {
    mainDiv: `flex flex-row absolute`,
    img: `w-[50%] h-[300px]`,
  }
  return (
    <div className={style.mainDiv}>
      <img className={style.img} src={img} />
      <button onClick={() => dispatch({ type: 'DOWN_INDEX' })}>-==</button>
      <button onClick={() => dispatch({ type: 'UP_INDEX' })}>==-</button>
    </div>
  )
}

export default Slider
