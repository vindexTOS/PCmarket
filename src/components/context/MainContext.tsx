import { type } from 'os'
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useReducer,
  Reducer,
} from 'react'
import { Photodata } from '../../utils/data/Photos'
type Cell = {
  slideIndex: number
  state: State
  dispatch: React.Dispatch<Action>
}
type Action = {
  type: string
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
  // slider  reducer function
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
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer<Reducer<State, Action>>(sliderReducer, {
    index: 0,
  })
  return (
    <MainContext.Provider value={{ slideIndex, state, dispatch }}>
      {children}
    </MainContext.Provider>
  )
}

export const UseMainContext = () => {
  return useContext(MainContext)
}
