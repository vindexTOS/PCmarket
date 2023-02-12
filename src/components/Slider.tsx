import React from 'react'
import { Photodata } from '../utils/data/Photos'
import { UseMainContext } from './context/MainContext'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import ArrowBtn from './ArrowBtn'
import SliderPoints from './SliderPoints'

function Slider() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { state, dispatch } = context
  const { img } = Photodata[state.index]
  const style = {
    mainDiv: `flex flex-row items-center justify-center w-[90%] `,
    img: `w-[100%] h-[600px]`,
    btnDiv: `absolute z-30 w-[80%] h-[50%] flex items-center justify-between   `,
  }
  return (
    <div className={style.mainDiv}>
      <img className={style.img} src={img} />

      <div className={style.btnDiv}>
        <ArrowBtn actiontype={'DOWN_INDEX'}>
          <IoIosArrowBack className="btnshaddow" />
        </ArrowBtn>
        <ArrowBtn actiontype={'UP_INDEX'}>
          <IoIosArrowForward className="btnshaddow" />
        </ArrowBtn>
      </div>
      <SliderPoints Photodata={Photodata} />
    </div>
  )
}

export default Slider
