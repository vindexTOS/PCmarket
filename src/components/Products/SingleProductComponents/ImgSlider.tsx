import React, { FC, Reducer, useReducer } from 'react'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
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
    imgDiv: `flex  items-center justify-center gap-2  mb-20      `,

    imgMapDiv: `flex  flex-col  gap-2 h-[500px] items-start justify-start`,
    imgMapSingle: `w-[90px] h-[90px] outline outline-1 cursor-pointer hover:outline-blue-400  `,
    imgMain: 'w-[520px] h-[500px] flex items-center justify-center',
    arrowDiv: `text-[4rem] absolute flex  w-[520px] items-cneter justify-between   text-opacity-50 `,
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
        <img
          style={{ userSelect: 'none' }}
          className="h-[500px] w-[520px]"
          src={imgs[state.index]}
        />
      </div>
    </div>
  )
}

export default ImgSlider
