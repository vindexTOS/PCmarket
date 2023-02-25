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
  dropDownSideNav: boolean
  setDropDownSideNav: React.Dispatch<React.SetStateAction<boolean>>
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
  useEffect(() => {
    //pre filtering data and sending them to there respective files
    setPCData(
      productData?.filter(
        (val: { category: string }) =>
          val.category == 'Pre built' || val.category == 'Used Pc',
      ),
    )
    setLaptopData(
      productData?.filter(
        (val: { category: string }) =>
          val.category == 'New Laptop' || val.category == 'Used Laptop',
      ),
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
  }, [productData, filterVal]) //every time productData is fetched from firebase its going to filter and update each state for there specifice categorys
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
  // drop down menu side navigation
  const [dropDownSideNav, setDropDownSideNav] = useState<boolean>(false)
  useEffect(() => {
    setDropDownSideNav(false)
  }, [location])

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
        dropDownSideNav,
        setDropDownSideNav,
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
