import React from 'react'
import { Photodata } from '../utils/data/Photos'
import { UseFormContext } from '../components/context/FormContext'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import ArrowBtn from './ArrowBtn'
import SliderPoints from './SliderPoints'

import { PaletteColors, usePalette } from 'react-palette'

function Slider() {
  const context = UseFormContext()
  if (!context) {
    return null
  }
  const { img, data } = context

  const style = {
    mainDiv: `flex flex-row items-center justify-center max_md2:hidden  z-30 w-[96%]  h-[600px] rounded-r-[15px] `,
    img: `w-[100%] h-[600px] rounded-r-[15px] `,
    btnDiv: `absolute z-30 w-[60%] h-[50%] flex items-center justify-between   `,
  }

  return (
    <>
      {' '}
      <div
        className={style.mainDiv}
        style={{
          borderTopRightRadius: '160px',

          boxShadow: `0px 0px 15px 0px ${data.vibrant}`,
        }}
      >
        <img
          style={{
            borderTopRightRadius: '160px',
          }}
          className={style.img}
          src={img}
        />

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
    </>
  )
}

export default Slider
