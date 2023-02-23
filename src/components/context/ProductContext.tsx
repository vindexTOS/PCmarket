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
  }, [productData])

  return (
    <ProductContext.Provider
      value={{ productData, location, PCData, LaptopData, ComponentsData }}
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
