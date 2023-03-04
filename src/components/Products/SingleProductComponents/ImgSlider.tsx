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
    imgDiv: `flex items-center justify-center gap-2  mb-20 max_xl:     `,

    imgMapDiv: `flex  flex-col  gap-2 h-[500px] items-start justify-start`,
    imgMapSingle: `w-[90px] h-[90px] max_x:w-[120px] max_x:h-[120px outline outline-1 cursor-pointer hover:outline-blue-400   rounded-[5px]  `,
    imgMain:
      'w-[520px] h-[500px] max_x:w-[90%]   flex items-center justify-center',
    arrowDiv: `text-[4rem] absolute flex  w-[520px] max_x:w-[80%] items-cneter justify-between  max_xl:w-[400px]  text-opacity-50 `,
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
          className="h-[500px] w-[520px] max_x:w-[95%] rounded-[5px]  "
          src={imgs[state.index]}
        />
      </div>
    </div>
  )
}

export default ImgSlider
