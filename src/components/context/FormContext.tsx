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
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

import { NavigateFunction, useNavigate } from 'react-router-dom'
import { randomData } from './ContextUtils'

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
  getValues: UseFormGetValues<FieldValues>
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
  allUsers: unknown | any
  specCheck: boolean
  setSpecs: React.Dispatch<React.SetStateAction<string>>
  CPUmodel: string
  setCPUModel: React.Dispatch<React.SetStateAction<string>>
  CPUcompany: boolean
  inputCPU: boolean
  setInputCPU: React.Dispatch<React.SetStateAction<boolean>>
  GPUmodel: string
  GPUcompany: boolean
  inputGPU: boolean
  setInputGPU: React.Dispatch<React.SetStateAction<boolean>>
  setGPUModel: React.Dispatch<React.SetStateAction<string>>
  laptopChack: boolean
  cputCheck: boolean
  gputCheck: boolean
  RAMCheck: boolean
  MbCheck: boolean
  DISKCheck: boolean
  PhoneCheck: boolean
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
const FormContext = createContext<Cell | null>(null)

export const FormContextProvider = ({
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
        navigate('/')
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

  // category check for specs card
  const [specCheck, setSpecCheck] = useState<boolean>(false)
  const [specs, setSpecs] = useState<string>('Pre built')
  const [laptopChack, setLaptopChack] = useState<boolean>(false)

  const [cputCheck, setCpuCheck] = useState<boolean>(false)
  const [gputCheck, setGpuCheck] = useState<boolean>(false)
  const [RAMCheck, setRAMCheck] = useState<boolean>(false)
  const [MbCheck, setMBCheck] = useState<boolean>(false)
  const [DISKCheck, setDISKCheck] = useState<boolean>(false)
  const [PhoneCheck, setPhoneCheck] = useState<boolean>(false)
  const [electronicCheck, setElectroincCheck] = useState<boolean>(false)
  useEffect(() => {
    //if specs == PC or something or getValues(Category) == pc or laptop
    if (specs == 'Used Pc' || specs == 'Pre built') {
      setSpecCheck(true)
      setLaptopChack(false)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(false)
      setMBCheck(false)
      setDISKCheck(false)
      setPhoneCheck(false)
      setElectroincCheck(false)
    } else if (specs == 'New Laptop' || specs == 'Used Laptop') {
      setLaptopChack(true)
      setSpecCheck(true)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(false)
      setMBCheck(false)
      setDISKCheck(false)
      setPhoneCheck(false)
      setElectroincCheck(false)
    } else if (specs == 'CPU') {
      setSpecCheck(false)
      setLaptopChack(false)
      setCpuCheck(true)
      setGpuCheck(false)
      setRAMCheck(false)
      setMBCheck(false)
      setDISKCheck(false)
      setPhoneCheck(false)
      setElectroincCheck(false)
    } else if (specs == 'GPU') {
      setSpecCheck(false)
      setLaptopChack(false)
      setCpuCheck(false)
      setGpuCheck(true)
      setRAMCheck(false)
      setMBCheck(false)
      setPhoneCheck(false)
      setElectroincCheck(false)
    } else if (specs == 'RAM') {
      setSpecCheck(false)
      setLaptopChack(false)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(true)
      setMBCheck(false)
      setDISKCheck(false)
      setPhoneCheck(false)
      setElectroincCheck(false)
    } else if (specs == 'Mother Board') {
      setMBCheck(true)
      setSpecCheck(false)
      setLaptopChack(false)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(false)
      setDISKCheck(false)
      setPhoneCheck(false)
      setElectroincCheck(false)
    } else if (specs == 'HDD/SSD') {
      setDISKCheck(true)
      setMBCheck(false)
      setSpecCheck(false)
      setLaptopChack(false)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(false)
      setPhoneCheck(false)
    } else if (specs == 'New' || specs == 'Used') {
      setPhoneCheck(true)
      setDISKCheck(false)
      setMBCheck(false)
      setSpecCheck(false)
      setLaptopChack(false)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(false)
      setElectroincCheck(false)
    } else if (
      specs == 'Keyboard/mouse' ||
      specs == 'Audio' ||
      specs == 'Monitors' ||
      specs == 'Others'
    ) {
      setElectroincCheck(true)
      setPhoneCheck(false)
      setDISKCheck(false)
      setMBCheck(false)
      setSpecCheck(false)
      setLaptopChack(false)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(false)
    } else if (specs == 'PC') {
      setLaptopChack(false)
    } else if (specs == 'Laptop') {
      setLaptopChack(true)
    } else {
      setSpecCheck(false)
      setLaptopChack(false)
      setSpecCheck(false)
      setCpuCheck(false)
      setGpuCheck(false)
      setRAMCheck(false)
      setMBCheck(false)
      setDISKCheck(false)
    }
    console.log(specs)
  }, [specs])

  //cpu finder //
  //other CPU model checker
  const [CPUmodel, setCPUModel] = useState<string>('')
  const [CPUcompany, setCPUcompany] = useState<boolean>(true)
  const [inputCPU, setInputCPU] = useState<boolean>(false)
  useEffect(() => {
    if (CPUmodel == 'Intel') {
      setCPUcompany(true)
    } else if (CPUmodel == 'AMD') {
      setCPUcompany(false)
    }
  }, [CPUmodel])
  // GPU model checker
  const [GPUmodel, setGPUModel] = useState<string>('')
  const [GPUcompany, setGPUcompany] = useState<boolean>(true)
  const [inputGPU, setInputGPU] = useState<boolean>(true)
  useEffect(() => {
    if (GPUmodel == 'Nvidia') {
      setGPUcompany(true)
    } else if (GPUmodel == 'AMD') {
      setGPUcompany(false)
    }
  }, [GPUmodel])
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
    const promises = []

    for (let i = 0; i < image.length; i++) {
      const file = image[i]
      if (file !== null) {
        let RandomID = ''
        for (let i = 0; i < 19; i++) {
          let randomId = Math.floor(Math.random() * randomData.length)

          RandomID += randomData[randomId]
        }
        const imageRef = ref(storage, `product/${RandomID}`)

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
    // let category = getValues('category')
    let title = getValues('title')
    let description = getValues('description')
    let price = getValues('price')
    let name = getValues('name')
    let number = getValues('number')
    // PC specs
    let chip = getValues('chip')
    let ddr = getValues('ddr')
    let ramGb = getValues('ramGb')
    let gpu = getValues('gpu')
    let mb = getValues('mb')
    let mbSocket = getValues('mbSocket')
    let ramSlot = getValues('ramSlot')
    let harddrive = getValues('harddrive')
    let harddriveGB = getValues('harddriveGB')
    let psu = getValues('psu')
    let screen = getValues('screen')
    // specs object////////////////////////////
    const PCspecObj = {
      chip,
      ddr,
      ramGb,
      gpu,
      mb,
      mbSocket,
      ramSlot,
      harddrive,
      harddriveGB,
      psu,
    }
    /// laptop object difference is PC obj has pus and laptop obj has screen
    const LaptopspecObj = {
      chip,
      ddr,
      ramGb,
      gpu,
      mb,
      mbSocket,
      ramSlot,
      harddrive,
      harddriveGB,
      screen,
    }

    //GPU specs//////////////////////
    let GPU = getValues('GPU')
    let GPUCOMPANY = getValues('GPUCOMPANY')
    let GPUPLATFORM = getValues('GPUPLATFORM')
    let GPUMHZ = getValues('GPUMHZ')
    let GPURAM = getValues('GPURAM')
    // GPU OBJECT
    const gpuObj = {
      GPU,
      GPUCOMPANY,
      GPUPLATFORM,
      GPUMHZ,
      GPURAM,
    }

    //CPU specs///////////////////
    let CPU = getValues('chip')
    let CPUCOMPANY = getValues('CPUCOMPANY')
    let CPUPLATFORM = getValues('CPUPLATFORM')
    let CPUGHZ = getValues('CPUGHZ')
    let CPUCORES = getValues('CORE')
    //CPU OBJECT
    const cpuObj = {
      CPU,
      CPUCOMPANY,
      CPUPLATFORM,
      CPUGHZ,
      CPUCORES,
    }

    // RAM specs/////////
    let RAMGB = getValues('RAMGBS')
    let RAMPLATFORM = getValues('RAMPLATFORM')
    let RAMMHZ = getValues('RAMMHZ')
    let RAMDDR = getValues('RAMDDR')
    //RAM Obj
    const ramObj = {
      RAMGB,
      RAMPLATFORM,
      RAMMHZ,
      RAMDDR,
    }
    /// hard drive SSD HDD  specs///
    let DISKcapasity = getValues('DISKCAPACITY')
    let DISKtype = getValues('DISKTYPE')
    let DISKplatform = getValues('DISKPLATFORM')
    // hard drive object
    const diskObj = {
      DISKcapasity,
      DISKtype,
      DISKplatform,
    }

    // phone specs

    let PHONEcompany = getValues('PHONECOMPANY')
    let PHONECPU = getValues('PHONECPU')
    let PHONEscreen = getValues('PHONESCREEN')
    let PHONEcamera = getValues('CAMERA')
    let PHONEmodel = getValues('PHONEMODEL')
    let PHONEram = getValues('PHONERAM')
    // phone obj
    const phoneObj = {
      PHONEcompany,
      PHONECPU,
      PHONEscreen,
      PHONEcamera,
      PHONEmodel,
      PHONEram,
    }

    const emptyObj = {
      type: 'electronics',
    }
    // user ID for refrencing
    const { uid } = auth.currentUser as { uid: string }
    // function that returns main data with aditionalObj returning specifice category
    const mainObjectReturn = (aditionalObj: unknown) => {
      // aditional object is for different categorys
      const mainData = {
        uid,
        date: Date(),
        timestamp: serverTimestamp(),
        sallType: proDetales,
        category: specs,
        imgs: photos,
        title,
        description,
        price,
        priceCur,
        location,
        name,
        number,
        aditionalObj,
      }
      return mainData
    }
    try {
      if (electronicCheck) {
        await addDoc(collection(db, 'user_product'), mainObjectReturn(emptyObj))
      } else if (PhoneCheck) {
        await addDoc(collection(db, 'user_product'), mainObjectReturn(phoneObj))
      } else if (DISKCheck) {
        await addDoc(collection(db, 'user_product'), mainObjectReturn(diskObj))
      } else if (RAMCheck) {
        await addDoc(collection(db, 'user_product'), mainObjectReturn(ramObj))
      } else if (cputCheck) {
        await addDoc(collection(db, 'user_product'), mainObjectReturn(cpuObj))
      } else if (gputCheck) {
        await addDoc(collection(db, 'user_product'), mainObjectReturn(gpuObj))
      } else if (!laptopChack) {
        await addDoc(
          collection(db, 'user_product'),
          mainObjectReturn(PCspecObj),
        )
      } else if (laptopChack) {
        await addDoc(
          collection(db, 'user_product'),
          mainObjectReturn(LaptopspecObj),
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormContext.Provider
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
        getValues,
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

        allUsers,
        specCheck,
        setSpecs,
        CPUmodel,
        setCPUModel,
        CPUcompany,
        inputCPU,
        setInputCPU,
        GPUmodel,
        GPUcompany,
        inputGPU,
        setInputGPU,
        setGPUModel,
        laptopChack,
        cputCheck,
        gputCheck,
        RAMCheck,
        MbCheck,
        DISKCheck,
        PhoneCheck,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const UseFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('ITs not wrapped etc')
  }
  return context
}
