import { create } from 'domain'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
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
import { UseFormContext } from './FormContext'
import { db } from '../firebase/firebaseconfig'
import { useLocation, Location } from 'react-router-dom'
import { type } from 'os'

type Cell = {
  productData: unknown | any
  PCData: unknown | any
  location: Location

  LaptopData: unknown | any
  ComponentsData: unknown | any
  PhoneData: unknown | any
  ElectronicsData: unknown | any
  setFilterDropDown: React.Dispatch<React.SetStateAction<boolean>>
  filterDropDown: boolean
  filterVal: { keyge: string; keyen: string }
  FilterTracker: (keyge: string, keyen: string) => void
  gridLayOut: boolean
  setGridLayOut: React.Dispatch<React.SetStateAction<boolean>>

  PCsubCategory: boolean
  LaptopsubCategory: boolean
  dropDownFilter: boolean
  setdropDownFilter: React.Dispatch<React.SetStateAction<boolean>>
  filterState: FilterState
  filterDispatch: React.Dispatch<FilterAction>
  RouteProductPage: (
    | { path: string; subPath1: string; subPath2: string; data: [] }
    | { path: string; data: []; subPath1?: undefined; subPath2?: undefined }
  )[]

  stack: string[]
  setStack: React.Dispatch<React.SetStateAction<string[]>>
}

type FilterVal = {
  keyge: string
  keyen: string
}

type FilterState = {
  CPU?: string
  RAM?: string
  SSD?: string
  ROM?: string
  DDR?: string
  GPU?: string
  MB?: string
  PSU?: string
  // setPCData?: (productData: any[]) => void
}

type FilterAction = {
  type: string
  payload?: string
}

const ProductContext = createContext<Cell | null>(null)

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user } = UseFormContext()
  let location = useLocation()

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

  // drop down button for date and price filter
  const [filterDropDown, setFilterDropDown] = useState<boolean>(false)
  // drop down value state
  const [filterVal, setFilterVal] = useState<FilterVal>({
    keyge: 'თარიღის ზრდა',
    keyen: 'Date ascending',
  })
  const FilterTracker = (keyge: string, keyen: string) => {
    setFilterVal({ keyge, keyen })
    setFilterDropDown(false)
  }
  // use effect to trigger filter
  useEffect(() => {
    // checking filter value in both languages to determan filters action
    if (
      filterVal.keyen === 'Date decreasing' ||
      filterVal.keyge === 'თარიღის კლება'
    ) {
      //sorting firebase server data secoends to sort an array from newest to oldest
      setProductData(
        productData?.sort(
          (a: any, b: any) => b.timestamp.seconds - a.timestamp.seconds,
        ),
      )
    } else if (
      filterVal.keyen === 'Date ascending' ||
      filterVal.keyge === 'თარიღის ზრდა'
    ) {
      //sorting firebase server data secoends to sort an array from oldest to newest

      setProductData(
        productData?.sort(
          (a: any, b: any) => a.timestamp.seconds - b.timestamp.seconds,
        ),
      )
    } else if (
      filterVal.keyen === 'Price decreasing' ||
      filterVal.keyge === 'ფასის კლება'
    ) {
      // this converets string in to a number and roundes it down or up and then sorts it to lowest to highest
      setProductData(
        productData?.sort(
          (a: any, b: any) => parseInt(a.price) - parseInt(b.price),
        ),
      )
    } else if (
      filterVal.keyen === 'Price ascending' ||
      filterVal.keyge === 'ფასის ზრდა'
    ) {
      // this converets string in to a number and roundes it down or up and then sorts it to highest to lowest
      setProductData(
        productData?.sort(
          (a: any, b: any) => parseInt(b.price) - parseInt(a.price),
        ),
      )
    }
  }, [filterVal])

  //spliting data in to different categorys
  const [PCData, setPCData] = useState<unknown | any>()
  const [LaptopData, setLaptopData] = useState<unknown | any>()
  const [ComponentsData, setComponentsData] = useState<unknown | any>()
  const [PhoneData, setPhoneData] = useState<unknown | any>()
  const [ElectronicsData, setElectronicsData] = useState<unknown | any>()
  // use effect for filtering data based on there values

  // this useEffect and line 213 useEffect are connected
  useEffect(() => {
    //pre filtering data and sending them to there respective files
    setPCData(
      productData?.filter((val: { category: string }) => {
        // checking if we are on right route first
        if (location.pathname === '/desktop/used-pc') {
          // filtering sub categorys by using location
          return val.category == 'Used Pc'
        } else if (location.pathname === '/desktop/new-pc') {
          return val.category == 'Pre built'
        } else {
          return val.category == 'Pre built' || val.category == 'Used Pc'
        }
      }),
    )

    setLaptopData(
      productData?.filter((val: { category: string }) => {
        // checking if we are on right route first
        if (location.pathname === '/laptop/used-laptop') {
          // filtering sub categorys by using location
          return val.category == 'Used Laptop'
        } else if (location.pathname === '/laptop/new-laptop') {
          return val.category == 'New Laptop'
        } else {
          return val.category == 'New Laptop' || val.category == 'Used Laptop'
        }
      }),
    )
    setComponentsData(
      productData?.filter(
        (val: { category: string }) =>
          val.category == 'CPU' ||
          val.category == 'GPU' ||
          val.category == 'RAM' ||
          val.category == 'HDD/SSD' ||
          val.category == 'Mother Board' ||
          val.category == 'PSU' ||
          val.category == 'Cases' ||
          val.category == 'Others',
      ),
    )
    setPhoneData(
      productData?.filter(
        (val: { category: string }) =>
          val.category == 'New' || val.category == 'Used',
      ),
    )

    setElectronicsData(
      productData?.filter(
        (val: { category: string }) =>
          val.category == 'Keyboard/mouse' ||
          val.category == 'Audio' ||
          val.category == 'Monitors' ||
          val.category == 'Others',
      ),
    )
    //pre filtering data and sending them to there respective files
  }, [productData, filterVal, location]) //every time productData is fetched from firebase its going to filter and update each state for there specifice categorys
  // filterVal re triggers useEffect every time we filter filterVal

  // product layout change
  const [gridLayOut, setGridLayOut] = useState<boolean>(true)
  const [windowWidth, setwindowWidth] = useState<any>({
    width: window.innerWidth,
  })
  useEffect(() => {
    function handleResize() {
      setwindowWidth({ width: window.innerWidth })
      if (windowWidth.width < 770) {
        setGridLayOut(true)
      }
    }

    // console.log(windowWidth, gridLayOut)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowWidth])

  // responsive filter drop down state
  const [dropDownFilter, setdropDownFilter] = useState<boolean>(false)

  // sub category filter and spec filter for sub categorys
  // state for pcfilter sub category [new pc / used-pc pc]
  const [PCsubCategory, setPCsubCategory] = useState<boolean>(false)
  // state for pcfilter sub category [new laptop / used-laptop]
  const [LaptopsubCategory, setLaptopsubCategory] = useState<boolean>(false)
  // use effect for routing subcategorys and cancaling dorp down window
  // this useEffect and line 134 useEffect are connected
  useEffect(() => {
    //cancels drop down menu every time new category is clicked

    // subcategory switcher logic will re trigger every time location is changed in router

    // turn off sub filter if we are outside of specifice categorys
    if (location.pathname === '/') {
      setLaptopsubCategory(false)
      setPCsubCategory(false)
    }
    // pc category switcher
    if (location.pathname === '/desktop') {
      setPCsubCategory(true)
      setLaptopsubCategory(false)
    }
    // sub category filter logic
    if (location.pathname === '/desktop/used-pc') {
      //checking the specific sub category filter
      setPCData(
        productData?.filter(
          (val: { category: string }) => val.category == 'Used Pc',
        ),
      )
    } else if (location.pathname === '/desktop/new-pc') {
      setPCData(
        productData?.filter(
          (val: { category: string }) => val.category == 'Pre built',
        ),
      )
    }
    // sub switcher logic for laptop////////////////////////////////////

    if (location.pathname === '/laptop') {
      setLaptopsubCategory(true)
      setPCsubCategory(false)
    }

    // sub category filter logic
    if (location.pathname === '/laptop/used-laptop') {
      //checking the specific sub category filter
      setPCData(
        productData?.filter(
          (val: { category: string }) => val.category == 'Used Laptop',
        ),
      )
    } else if (location.pathname === '/laptop/new-laptop') {
      setPCData(
        productData?.filter(
          (val: { category: string }) => val.category == 'New Laptop',
        ),
      )
    }
  }, [location])
  // reducer function for sub category filter

  const filterReducer = (
    state: FilterState,
    action: FilterAction,
  ): FilterState => {
    switch (action.type) {
      case 'CPU':
        return { ...state, CPU: state.CPU = action.payload }
      case 'CPUUNCHECK':
        return { ...state, CPU: state.CPU = 'C' }

      case 'RAM':
        return { ...state, RAM: state.RAM = action.payload }
      case 'RAMUNCHECK':
        return { ...state, CPU: state.RAM = '' }

      case 'SSD':
        return { ...state, SSD: state.SSD = action.payload }
      case 'SSDUNCHECK':
        return { ...state, SSD: state.SSD = '' }

      case 'ROM':
        return { ...state, ROM: state.ROM = action.payload }
      case 'ROMUNCHECK':
        return { ...state, ROM: state.ROM = '' }

      case 'DDR':
        return { ...state, DDR: state.DDR = action.payload }
      case 'DDRUNCHECK':
        return { ...state, DDR: state.DDR = '' }

      case 'GPU':
        return { ...state, GPU: state.GPU = action.payload }
      case 'GPUUNCHECK':
        return { ...state, GPU: state.GPU = '' }

      case 'MB':
        return { ...state, MB: state.MB = action.payload }
      case 'MBUNCHECK':
        return { ...state, MB: state.MB = '' }

      case 'PSU':
        return { ...state, PSU: state.PSU = action.payload }
      case 'PSUCHECK':
        return { ...state, PSU: state.PSU = '' }

      default:
        return state
    }
  }

  const [filterState, filterDispatch] = useReducer<
    Reducer<FilterState, FilterAction>
  >(filterReducer, {
    CPU: '',
    RAM: '',
    SSD: '',
    ROM: '',
    DDR: '',
    GPU: '',
    MB: '',
    PSU: '',
  })

  type PCFilterType = {
    aditionalObj: any
    category: string
  }

  const [stack, setStack] = useState<string[]>([])

  useEffect(() => {
    let filteredData = productData

    console.log(
      productData?.filter((val: any) => {
        stack?.filter((item: string) => {
          console.log(item)
        })
        console.log(val.category)
      }),
    )

    // setPCData(
    //   productData?.filter((val: PCFilterType) => {
    //     if (val.category == 'Pre built' || val.category == 'Used Pc') {
    //       if (stack !== null) {
    //         stack?.filter((str) => {
    //           if (val.aditionalObj.chip.includes(str)) {
    //             return val
    //           }
    //         })
    //       }
    //     }
    //   }),
    // )

    // if (filterState?.ROM) {
    //   filteredData = filteredData.filter((val: PCFilterType) => {
    //     if (val.category == 'Pre built' || val.category == 'Used Pc') {
    //       if (val.aditionalObj.harddriveGB !== undefined)
    //         return val.aditionalObj.harddriveGB.includes(filterState.ROM)
    //     }
    //     return false
    //   })
    // }

    // if (filterState?.RAM) {
    //   filteredData = filteredData.filter((val: PCFilterType) => {
    //     if (val.category == 'Pre built' || val.category == 'Used Pc') {
    //       if (filterState?.RAM == 'C') {
    //         return val
    //       } else if (val.aditionalObj.ramGb !== undefined) {
    //         return val.aditionalObj.ramGb == filterState.RAM
    //       }
    //     }
    //   })
    // }

    // if (filterState?.CPU) {
    //   filteredData = filteredData.filter((val: PCFilterType) => {
    //     if (val.category == 'Pre built' || val.category == 'Used Pc') {
    //       if (filterState.CPU == 'C') {
    //         return val
    //       } else if (val.aditionalObj.chip !== undefined) {
    //         return val.aditionalObj.chip.includes(filterState.CPU)
    //       }
    //     }
    //   })
    // }

    // if (filterState?.SSD) {
    //   filteredData = filteredData.filter((val: PCFilterType) => {
    //     if (val.category == 'Pre built' || val.category == 'Used Pc') {
    //       if (val.aditionalObj.harddrive !== undefined) {
    //         return val.aditionalObj.harddrive.includes(filterState.SSD)
    //       }
    //     }
    //     return false
    //   })
    // }

    // if (filterState?.DDR) {
    //   filteredData = filteredData.filter((val: PCFilterType) => {
    //     if (val.category == 'Pre built' || val.category == 'Used Pc') {
    //       if (val.aditionalObj.ddr !== undefined) {
    //         return val.aditionalObj.ddr.includes(filterState.DDR)
    //       }
    //     }
    //     return false
    //   })
    // }
  }, [filterState, productData, filterVal, stack])

  const RouteProductPage = [
    { path: '/desktop', subPath1: 'used-pc', subPath2: 'new-pc', data: PCData },
    {
      path: '/laptop',
      subPath1: 'used-laptop',
      subPath2: 'new-laptop',
      data: LaptopData,
    },
    { path: '/components', data: ComponentsData },
    { path: '/phone', data: PhoneData },
    { path: '/electronics', data: ElectronicsData },
  ]

  return (
    <ProductContext.Provider
      value={{
        productData,
        location,
        PCData,
        LaptopData,
        ComponentsData,
        PhoneData,
        ElectronicsData,
        filterDropDown,
        setFilterDropDown,
        filterVal,
        FilterTracker,
        gridLayOut,
        setGridLayOut,

        PCsubCategory,
        LaptopsubCategory,
        dropDownFilter,
        setdropDownFilter,
        filterState,
        filterDispatch,
        RouteProductPage,
        stack,
        setStack,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const UseProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('ITs not wrapped etc')
  }
  return context
}
