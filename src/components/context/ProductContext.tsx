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
  filterVal: string
  setFilterVal: React.Dispatch<React.SetStateAction<string>>
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
  const [PCData, setPCData] = useState<unknown | any>()
  const [LaptopData, setLaptopData] = useState<unknown | any>()
  const [ComponentsData, setComponentsData] = useState<unknown | any>()
  const [PhoneData, setPhoneData] = useState<unknown | any>()
  const [ElectronicsData, setElectronicsData] = useState<unknown | any>()
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
  }, [productData]) //every time productData is fetched from firebase its going to filter and update each state for there specifice categorys

  // drop down button for date and price filter
  const [filterDropDown, setFilterDropDown] = useState<boolean>(false)
  // drop down value state
  const [filterVal, setFilterVal] = useState<string>('')

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
        setFilterVal,
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
