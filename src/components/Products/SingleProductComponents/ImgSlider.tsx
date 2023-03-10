import React, { FC, Reducer, useReducer, useState } from 'react'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import { motion as m, useDragControls } from 'framer-motion'
type ImgSliderProps = {
  imgs: string[]
}
type State = {
  index: number
}
type Action = {
  type?: string
  payload?: any
}

const ImgSlider: FC<ImgSliderProps> = ({ imgs }): JSX.Element => {
  const style = {
    imgDiv: `flex items-center justify-center gap-2  mb-20 max_xl: max_smm:border-b-2    `,

    imgMapDiv: `flex  flex-col max_smm:  gap-2 h-[500px]  items-start justify-start `,
    imgMapSingle: `w-[90px] h-[90px] max_x:w-[120px] max_x:h-[120px] max_smm:w-[60px] max_smm:h-[60px]  outline outline-1 cursor-pointer hover:outline-blue-400   rounded-[5px]  `,
    imgMain:
      'w-[520px] h-[500px] max_x:w-[90%] max_smm:h-[400px]   flex items-center justify-center',
    arrowDiv: `text-[4rem] absolute flex  max_smm:w-[80%] max_smm:mt-[11rem]  w-[520px] max_x:w-[80%] items-cneter justify-between  max_xl:w-[400px]  text-opacity-50 `,
    arrow: `hover:text-opacity-90 cursor-pointer flex   text-center  text-opacity-50 text-gray-300 hover:bg-gray-400 hover:bg-opacity-50 rounded-[50%]`,
  }
  //photo slider and hover reducer
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'IMG':
        return { index: state.index = action.payload }
      case 'INC':
        return {
          index: state.index >= imgs.length - 1 ? 0 : state.index + 1,
        }
      case 'DEC':
        return {
          index: state.index !== 0 ? state.index - 1 : imgs.length - 1,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    index: 0,
  })

  const controls = useDragControls()

  const startDrag = (event: PointerEvent | React.PointerEvent<Element>) => {
    controls.start(event)
  }

  return (
    <div className={style.imgDiv}>
      <div className={style.imgMapDiv}>
        {imgs?.map((img: string, index: number) => {
          return (
            <img
              style={{ userSelect: 'none' }}
              className={style.imgMapSingle}
              src={img}
              onMouseOver={() => dispatch({ type: 'IMG', payload: index })}
            />
          )
        })}
      </div>
      <div className={style.imgMain}>
        <div className={style.arrowDiv}>
          <MdOutlineKeyboardArrowLeft
            onClick={() => dispatch({ type: 'DEC' })}
            className={style.arrow}
          />
          <MdOutlineKeyboardArrowRight
            onClick={() => dispatch({ type: 'INC' })}
            className={style.arrow}
          />
        </div>
        <div onPointerDown={startDrag} />
        <m.img
          drag={'x'}
          dragControls={controls}
          dragConstraints={{ left: 0, right: 0 }}
          whileTap={{ scale: 1.2, marginTop: '40px' }}
          style={{
            userSelect: 'none',
          }}
          className={` h-[500px] w-[520px] max_smm:h-[400px] max_smm:mb-[6.3rem]  max_x:w-[95%] rounded-[5px] zoom   `}
          src={imgs[state.index]}
        />
      </div>
    </div>
  )
}

export default ImgSlider
