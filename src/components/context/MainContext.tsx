import { type } from 'os'
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useReducer,
  Reducer,
  JSXElementConstructor,
  ChangeEventHandler,
} from 'react'
import { PaletteColors, usePalette } from 'react-palette'
import { Photodata } from '../../utils/data/Photos'
import { auth, db, storage } from '../firebase/firebaseconfig'
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage'

import {
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

import { NavigateFunction, useNavigate } from 'react-router-dom'
import { sign } from 'crypto'

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
  handleMouseEnter: (index: number) => void
  handleMouseLeave: (index: number) => void
  isHovering: boolean[]
  getPrice: number
  setGetPrice: React.Dispatch<React.SetStateAction<number>>
  handleDragOver: (e: React.DragEvent<HTMLLabelElement>) => void
  handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void
  innerHandleDrop: (e: React.DragEvent<HTMLLabelElement>, index: number) => void
  handleSubmit: UseFormHandleSubmit<FieldValues>
  register: UseFormRegister<FieldValues>
  setProDetales: React.Dispatch<React.SetStateAction<string>>
  btnstate: StateCategoryBtn
  btndispatch: React.Dispatch<Action>
  handleFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data: UseFormHandleSubmit<FieldValues>,
  ) => void
  LocationTrack: (key: string, keyen: string) => void
  location: { key: string; keyen: string }
  priceCur: string
  setPrice: React.Dispatch<React.SetStateAction<string>>

  profileImg: (e: React.ChangeEvent<HTMLInputElement>) => void
  profilePicHtml: string
  profilePic: Blob | null
  setUserName: React.Dispatch<React.SetStateAction<string>>
  userName: string
  userInfo: (e: React.FormEvent<HTMLFormElement>) => void
  userData: unknown | any
  productData: unknown | any
  allUsers: unknown | any
}
type Action = {
  type: string | []
  payload?: any
}
type State = {
  index: number
}

type ActionCategoryBtn = {
  type: string | []
  payload?: string
}
type StateCategoryBtn = {
  btn1: boolean
  btn2: boolean
}

type Location = {
  key: string
  keyen: string
}
const MainContext = createContext<Cell | null>(null)

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // form hook
  const { handleSubmit, register, getValues } = useForm()

  const navigate = useNavigate()
  // loading state
  const [loadingRegister, setLoadingRegister] = useState<boolean>(true)

  // register and login
  const Register = (email: string, password: string) => {
    setUserAuth(true)

    setTimeout(() => {
      window.location.reload()
    }, 1000)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // login RegisterOptions<FieldValues, string> | undefined
  const LogIn = (email: string, password: string) => {
    setUserAuth(true)

    setTimeout(() => {
      window.location.reload()
    }, 1000)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // logout
  const LogOut = () => {
    signOut(auth)
  }

  const [user, setUser] = useState<FirebaseUser | null>(null)
  //error message state
  const [err, setErr] = useState<unknown>()
  // handle logout async function
  const [userAuth, setUserAuth] = useState<boolean>(false)
  const handleLogOut = async () => {
    try {
      await LogOut()
      navigate('/')
      setUserAuth(false)
      setLoadingRegister(false)
      console.log(user)
    } catch (err) {
      let message
      if (err instanceof Error) message = err.message
      else message = String(err)
      console.log(message)
      setErr({ message })
    }
  }

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
    })

    return sub()
  }, [])

  //user registerd doc info
  const [userName, setUserName] = useState<string>('')
  const [profilePicHtml, setProfilePicHtml] = useState<string>('')
  const [profilePic, setProfilePic] = useState<Blob | null>(null)
  const [imgUrl, setimgUrl] = useState<string>('')

  const profileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let newHtml = profilePicHtml
      let newProfilePic = profilePic

      newHtml = URL.createObjectURL(e.target.files[0])
      newProfilePic = e.target.files[0]

      setProfilePicHtml(newHtml)
      setProfilePic(newProfilePic)
    }
  }

  const userInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (profilePic !== null) {
        const { uid } = auth.currentUser as { uid: string }
        const storage = getStorage()
        const imageRef = ref(storage, `user_avatar${user?.uid}`)

        await uploadBytes(imageRef, profilePic)
        const url = await getDownloadURL(imageRef)

        setimgUrl(url)
        setProfilePic(null)
        await addDoc(collection(db, 'user_info'), {
          imgUrl: url,
          userName,
          timestamp: serverTimestamp(),
          uid,
        })
        navigate('home')
      }
    } catch (error) {}
  }
  //getting user info from fire base

  const [userData, setUserData] = useState<unknown | any>()
  const [allUsers, setAllUsers] = useState<unknown | any>()
  useEffect(() => {
    const q = query(collection(db, 'user_info'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querrySnapShot) => {
      let data: {
        id: string
        uid?: string
        imgUrl?: string
        userName?: string
      }[] = []

      querrySnapShot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      let uidData = data.filter((val) => {
        if (val.uid === user?.uid) {
          return val
        }
      })
      setUserData(uidData)
      setAllUsers(data)
    })

    return () => unsub()
  }, [user])

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

  // CategoryCard functions and states etc
  // geting product data from CategorysCard div
  const [proDetales, setProDetales] = useState<string>('')

  const btnReducer = (state: StateCategoryBtn, action: ActionCategoryBtn) => {
    switch (action.type) {
      case 'btn1':
        return { btn1: state.btn1 = true, btn2: state.btn2 = false }
      case 'btn2':
        return { btn1: state.btn1 = false, btn2: state.btn2 = true }
      default:
        return state
    }
  }

  const [btnstate, btndispatch] = useReducer<
    Reducer<StateCategoryBtn, ActionCategoryBtn>
  >(btnReducer, {
    btn1: true,
    btn2: false,
  })
  useEffect(() => {
    if (btnstate.btn1) {
      setProDetales('sale')
    } else if (btnstate.btn2) {
      setProDetales('buy')
    }
  }, [btnstate])

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

  //////////////////////////////

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
    let newImg = [...image]
    newHtmlImg[0] = URL.createObjectURL(e.dataTransfer.files[0])
    setImageHtml(newHtmlImg)
    newImg[0] = e.dataTransfer.files[0]

    setImage(newImg)
  }
  const innerHandleDrop = (
    e: React.DragEvent<HTMLLabelElement>,
    index: number,
  ) => {
    e.preventDefault()
    let newHtmlImg = [...imageHtml]
    let newImg = [...image]
    newHtmlImg[index] = URL.createObjectURL(e.dataTransfer.files[0])
    setImageHtml(newHtmlImg)

    newImg[index] = e.dataTransfer.files[0]

    setImage(newImg)
  }
  //form states
  const [getPrice, setGetPrice] = useState<number>(0)
  const [priceCur, setPrice] = useState<string>('')

  // location function
  const [location, setLocation] = useState<Location>({ key: '', keyen: '' })
  const LocationTrack = (key: string, keyen: string) => {
    setLocation({ key, keyen })
  }

  //submit form funciton

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: UseFormHandleSubmit<FieldValues>,
  ) => {
    e.preventDefault()
    const storage = getStorage()
    const imageRef = ref(storage, `image${user?.uid}`)
    const promises = []

    for (let i = 0; i < image.length; i++) {
      const file = image[i]
      if (file !== null) {
        const storageRef = imageRef
        console.log(image[i])
        promises.push(
          uploadBytesResumable(storageRef, file).then((uploadResult) => {
            return getDownloadURL(uploadResult.ref)
          }),
        )
      }
    }
    // Get all the downloadURLs
    const photos = await Promise.all(promises)
    console.log(photos)
    let category = getValues('category')
    let title = getValues('title')
    let description = getValues('description')
    let price = getValues('price')
    let name = getValues('name')
    let number = getValues('number')

    try {
      const { uid } = auth.currentUser as { uid: string }
      await addDoc(collection(db, 'user_product'), {
        uid,
        date: Date(),
        timestamp: serverTimestamp(),
        sallType: proDetales,
        category,
        imgs: photos,
        title,
        description,
        price,
        priceCur,
        location,
        name,
        number,
      })
    } catch (error) {}
  }

  // pulling product data from firebase

  const [productData, setProductData] = useState<unknown | any>()
  useEffect(() => {
    const q = query(collection(db, 'user_product'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querrySnapShot) => {
      let data: {}[] = []

      querrySnapShot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      setProductData(data)
    })
    return () => unsub()
  }, [user])

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
        handleMouseEnter,
        handleMouseLeave,
        isHovering,

        getPrice,
        setGetPrice,
        handleDragOver,
        handleDrop,
        innerHandleDrop,
        handleSubmit,
        register,
        setProDetales,
        btnstate,
        btndispatch,
        handleFormSubmit,
        LocationTrack,
        location,
        priceCur,
        setPrice,
        profilePicHtml,
        profileImg,
        setUserName,
        userName,
        userInfo,
        profilePic,
        userData,
        productData,
        allUsers,
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
