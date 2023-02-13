import { type } from 'os'
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useReducer,
  Reducer,
  JSXElementConstructor,
} from 'react'
import { PaletteColors, usePalette } from 'react-palette'
import { Photodata } from '../../utils/data/Photos'

type Cell = {
  slideIndex: number
  state: State
  dispatch: React.Dispatch<Action>
  img: string
  data: PaletteColors
}
type Action = {
  type: string | []
  payload?: any
}
type State = {
  index: number
}
const MainContext = createContext<Cell | null>(null)

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  //slider lorgic
  // slider index state
  const [slideIndex, setSlideIndex] = useState<number>(0)
  // slider  reducer function ////////////////////////////////////////////////////////////////////////////////////////
  const sliderReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'UP_INDEX':
        return {
          index:
            state.index == Photodata.length - 1
              ? (state.index = -1)
              : state.index + 1,
        }
      case 'DOWN_INDEX':
        return {
          index:
            state.index <= 0
              ? (state.index = Photodata.length)
              : state.index - 1,
        }
      case 'POINTER_INDEX':
        return {
          index: state.index = action.payload,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer<Reducer<State, Action>>(sliderReducer, {
    index: 0,
  })
  // useEffect for slide ///////////////////////////////////////////////
  const [tiemFire, setTimeFire] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'UP_INDEX' })
      setTimeFire(!tiemFire)
    }, 5000)
  }, [tiemFire])

  const { img } = Photodata[state.index]
  // slider color
  const { data, loading, error } = usePalette(img)

  //slider reducer end /////////////////////////////////////////////////////////////////

  return (
    <MainContext.Provider value={{ slideIndex, state, dispatch, img, data }}>
      {children}
    </MainContext.Provider>
  )
}

export const UseMainContext = () => {
  return useContext(MainContext)
}
