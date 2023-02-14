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
import { auth } from '../firebase/firebaseconfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { NavigateFunction, useNavigate } from 'react-router-dom'

type Cell = {
  slideIndex: number
  state: State
  dispatch: React.Dispatch<Action>
  img: string
  data: PaletteColors
  Register: (email: string, password: string) => void
  LogIn: (email: string, password: string) => void
  user: {} | unknown
  handleLogOut: () => void
  navigate: NavigateFunction
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
  const navigate = useNavigate()
  // register and login
  const Register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // login
  const LogIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  // logout
  const LogOut = () => {
    signOut(auth)
  }
  //error message state
  const [err, setErr] = useState<unknown>()
  // handle logout async function
  const handleLogOut = async () => {
    try {
      await signOut(auth)
      navigate('/')
      console.log(user)
    } catch (err) {
      let message
      if (err instanceof Error) message = err.message
      else message = String(err)
      console.log(message)
      setErr({ message })
    }
  }
  // user auth data
  const [user, setUser] = useState<{} | unknown>({})
  useEffect(() => {
    const sub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log(user)
    })

    return sub()
  }, [])

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
    <MainContext.Provider
      value={{
        slideIndex,
        state,
        dispatch,
        img,
        data,
        Register,
        LogIn,
        handleLogOut,
        user,
        navigate,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const UseMainContext = () => {
  return useContext(MainContext)
}
