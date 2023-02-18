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
  User as FirebaseUser,
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
  user: FirebaseUser | null
  handleLogOut: () => void
  navigate: NavigateFunction
  userAuth: boolean
  setUserAuth: React.Dispatch<React.SetStateAction<boolean>>
  loadingRegister: boolean
  lang: boolean
  setLang: React.Dispatch<React.SetStateAction<boolean>>
  imgUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  image: (File | null)[]
  imageHtml: (String | null)[]
  imgRemove: (index: number) => void
  handleDragImg: (e: React.DragEvent<HTMLInputElement>, index: number) => void
  handleMouseEnter: (index: number) => void
  handleMouseLeave: (index: number) => void
  isHovering: boolean[]
  imgReupload: boolean
  setImgReupload: React.Dispatch<React.SetStateAction<boolean>>
  getPrice: number
  setGetPrice: React.Dispatch<React.SetStateAction<number>>
  handleDragOver: (e: React.DragEvent<HTMLLabelElement>) => void
  handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void
  innerHandleDrop: (e: React.DragEvent<HTMLLabelElement>, index: number) => void
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
  const [userAuth, setUserAuth] = useState<boolean>(false)
  const handleLogOut = async () => {
    try {
      await LogOut()
      navigate('/')
      console.log(user)
      setUserAuth(false)
    } catch (err) {
      let message
      if (err instanceof Error) message = err.message
      else message = String(err)
      console.log(message)
      setErr({ message })
    }
  }
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loadingRegister, setLoadingRegister] = useState<boolean>(true)
  useEffect(() => {
    if (user !== null) {
      setUserAuth(true)
    } else if (!user) {
      setUserAuth(false)
    }
    setTimeout(() => {
      setLoadingRegister(false)
    }, 2000)
  }, [user])
  // user auth data
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

  //language change
  const [lang, setLang] = useState<boolean>(false)
  // img upload
  // img state for fire base
  const [image, setImage] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ])
  // img state for imageHtlm
  const [imageHtml, setImageHtml] = useState<(String | null)[]>([])
  // saving on state function
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      let newHtmlImg = [...imageHtml]
      let newImg = [...image]

      newHtmlImg[index] = URL.createObjectURL(e.target.files[0])
      newImg[index] = e.target.files[0]

      setImage(newImg)
      setImageHtml(newHtmlImg)
    }
  }
  // on drag upload
  const handleDragImg = (
    e: React.DragEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let newHtmlImg = [...imageHtml]
      let newImg = [...image]

      newHtmlImg[index] = URL.createObjectURL(e.dataTransfer.files[0])
      newImg[index] = e.dataTransfer.files[0]

      setImage(newImg)
      setImageHtml(newHtmlImg)
    }
    if (!imageHtml[0]) {
      setImageHtml([])
      setImgReupload(!imgReupload)
    }
  }
  const [imgReupload, setImgReupload] = useState<boolean>(false)
  useEffect(() => {
    console.log(imageHtml)
  }, [imgReupload])
  // delete img from form
  const imgRemove = (index: number) => {
    setImageHtml((prevImageHtml) => {
      const newImageHtml = [...prevImageHtml]
      newImageHtml.splice(index, 1)
      return newImageHtml
    })
  }
  // img hover
  const [isHovering, setIsHovering] = useState<boolean[]>(
    new Array(imageHtml.length).fill(false),
  )

  const handleMouseEnter = (index: number) => {
    let newval = [...isHovering]
    newval[index] = true
    setIsHovering([...newval])
  }

  const handleMouseLeave = (index: number) => {
    let newval = [...isHovering]
    newval[index] = false
    setIsHovering([...newval])
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    let newHtmlImg = [...imageHtml]
    newHtmlImg[0] = URL.createObjectURL(e.dataTransfer.files[0])
    setImageHtml(newHtmlImg)
  }
  const innerHandleDrop = (
    e: React.DragEvent<HTMLLabelElement>,
    index: number,
  ) => {
    e.preventDefault()
    let newHtmlImg = [...imageHtml]
    newHtmlImg[index] = URL.createObjectURL(e.dataTransfer.files[0])
    setImageHtml(newHtmlImg)
  }
  //form states
  const [getPrice, setGetPrice] = useState<number>(0)

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
        userAuth,
        setUserAuth,
        loadingRegister,
        lang,
        setLang,
        image,
        imgUpload,
        imageHtml,
        imgRemove,
        handleDragImg,
        handleMouseEnter,
        handleMouseLeave,
        isHovering,
        imgReupload,
        setImgReupload,
        getPrice,
        setGetPrice,
        handleDragOver,
        handleDrop,
        innerHandleDrop,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const UseMainContext = () => {
  const context = useContext(MainContext)
  if (!context) {
    throw new Error('ITs not wrapped etc')
  }
  return context
}
