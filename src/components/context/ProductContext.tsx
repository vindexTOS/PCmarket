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
  setComponentssubCategory: React.Dispatch<React.SetStateAction<boolean>>
  RouteProductPage: (
    | {
        path: string
        subPath1: string
        subPath2: string
        subPath3?: string
        subPath4?: string
        subPath5?: string
        subPath6?: string
        subPath7?: string
        subPath8?: string
        data: []
      }
    | {
        path: string

        subPath1?: undefined
        subPath2?: undefined
        subPath3?: string
        subPath4?: string
        subPath5?: string
        subPath6?: string
        subPath7?: string
        subPath8?: string
        data: []
      }
  )[]

  setPCData: React.Dispatch<React.SetStateAction<unknown | any>>
  setLaptopData: React.Dispatch<React.SetStateAction<unknown | any>>
  setComponentsData: React.Dispatch<React.SetStateAction<unknown | any>>

  ComponentsSubCategory: boolean
  ComponentsCategory: boolean
  setComponentsCategory: React.Dispatch<React.SetStateAction<boolean>>

  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

type FilterVal = {
  keyge: string
  keyen: string
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
  // state for components category filter
  const [ComponentsCategory, setComponentsCategory] = useState<boolean>(false)
  /// state for components sub category filter [cpu/gpu/ram/etc]

  const [ComponentsSubCategory, setComponentssubCategory] = useState<boolean>(
    false,
  )
  // use effect for routing subcategorys and cancaling dorp down window

  // this useEffect and line 134 useEffect are connected
  useEffect(() => {
    //cancels drop down menu every time new category is clicked

    // subcategory switcher logic will re trigger every time location is changed in router

    // turn off sub filter if we are outside of specifice categorys
    if (location.pathname === '/') {
      setLaptopsubCategory(false)
      setPCsubCategory(false)
      setComponentssubCategory(false)

      setComponentsCategory(false)
    }
    // pc category switcher
    if (location.pathname === '/desktop') {
      setPCsubCategory(true)
      setComponentssubCategory(false)
      setComponentsCategory(false)
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
      setComponentssubCategory(false)
      setComponentsCategory(false)
    }

    // sub category filter logic
    if (location.pathname === '/laptop/used-laptop') {
      //checking the specific sub category filter
      setLaptopData(
        productData?.filter(
          (val: { category: string }) => val.category == 'Used Laptop',
        ),
      )
    } else if (location.pathname === '/laptop/new-laptop') {
      setLaptopData(
        productData?.filter(
          (val: { category: string }) => val.category == 'New Laptop',
        ),
      )
    }
    // sub switcer logic for compnents//////
    if (location.pathname === '/components') {
      setLaptopsubCategory(false)
      setPCsubCategory(false)
      setComponentsCategory(false)
      console.log(PCsubCategory)
      setComponentssubCategory(true)
    }
    // sub categorys for components

    if (location.pathname == '/components/cpu') {
      setComponentsCategory(true)
      setComponentssubCategory(true)
      setComponentsData(
        productData?.filter(
          (val: { category: string }) => val.category == 'CPU',
        ),
      )
    } else if (location.pathname === '/components/gpu') {
      setComponentsCategory(true)
      setComponentssubCategory(true)

      setComponentsData(
        productData?.filter(
          (val: { category: string }) => val.category == 'GPU',
        ),
      )
    } else if (location.pathname === '/components/ram') {
      setComponentsCategory(true)
      setComponentssubCategory(true)
      setComponentsData(
        productData?.filter(
          (val: { category: string }) => val.category === 'RAM',
        ),
      )
    } else if (location.pathname === '/components/harddisk') {
      setComponentsData(
        productData?.filter(
          (val: { category: string }) => val.category === 'HDD/SSD',
        ),
      )
    } else if (location.pathname === '/components/motherboard') {
      setComponentsData(
        productData?.filter(
          (val: { category: string }) => val.category === 'Mother Board',
        ),
      )
    } else if (location.pathname === '/components/case') {
      setComponentsData(
        productData?.filter(
          (val: { category: string }) => val.category === 'Cases',
        ),
      )
    } else if (location.pathname == '/components/other') {
      setComponentsData(
        productData?.filter(
          (val: { category: string }) => val.category === 'Others',
        ),
      )
    }
  }, [location, productData])

  //object for page routers
  const RouteProductPage = [
    { path: '/desktop', subPath1: 'used-pc', subPath2: 'new-pc', data: PCData },
    {
      path: '/laptop',
      subPath1: 'used-laptop',
      subPath2: 'new-laptop',
      data: LaptopData,
    },
    {
      path: '/components',
      subPath1: 'cpu',
      subPath2: 'gpu',
      subPath3: 'ram',
      subPath4: 'harddisk',
      subPath5: 'psu',
      subPath6: 'motherboard',
      subPath7: 'case',
      subPath8: 'other',

      data: ComponentsData,
    },
    { path: '/phone', data: PhoneData },
    { path: '/electronics', data: ElectronicsData },
  ]
  // search bar logic
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
    console.log(productData)
  }, [search])
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

        RouteProductPage,

        setPCData,
        setLaptopData,
        ComponentsSubCategory,
        setComponentsData,
        setComponentssubCategory,
        ComponentsCategory,
        setComponentsCategory,
        search,
        setSearch,
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
