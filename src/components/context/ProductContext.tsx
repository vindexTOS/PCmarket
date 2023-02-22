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

type Cell = {
  productData: unknown | any
}

const ProductContext = createContext<Cell | null>(null)

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user } = UseFormContext()
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
    <ProductContext.Provider value={{ productData }}>
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
