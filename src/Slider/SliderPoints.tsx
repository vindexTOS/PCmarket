import React from 'react'
import { UseMainContext } from '../components/context/MainContext'
function SliderPoints({ Photodata }: { Photodata: {}[] }) {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { dispatch, state } = context
  return (
    <div className="flex flex-row absolute justify-end items-end gap-10 mt-[35%]">
      {Photodata.map((val, index) => {
        return (
          <div
            key={index}
            onClick={() => dispatch({ type: 'POINTER_INDEX', payload: index })}
            className={` w-[30px] h-[30px] rounded-[50%] z-30  cursor-pointer ${
              state.index == index ? 'bg-red-600' : 'bg-white '
            }`}
          ></div>
        )
      })}
    </div>
  )
}

export default SliderPoints
