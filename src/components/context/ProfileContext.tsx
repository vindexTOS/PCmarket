import React, { useContext, createContext, useState } from 'react'
import { UseFormContext } from './FormContext'
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
type Cell = {
  starRating: number
  setStarRating: React.Dispatch<React.SetStateAction<number>>
  ratingPopUp: boolean
  setRatingPopUp: React.Dispatch<React.SetStateAction<boolean>>
  setRatingComment: React.Dispatch<React.SetStateAction<string>>
}

const ProfileContext = createContext<Cell | null>(null)

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {} = UseFormContext()
  //user raiting system
  // state for take values from stars
  const [starRating, setStarRating] = useState<number>(0)
  // rating pop up show
  const [ratingPopUp, setRatingPopUp] = useState<boolean>(false)
  // rating comment state
  const [ratingComment, setRatingComment] = useState<string>('')
  return (
    <ProfileContext.Provider
      value={{
        starRating,
        setStarRating,
        ratingPopUp,
        setRatingPopUp,
        setRatingComment,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const UseProfileContext = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('Provider is not wrapped on components')
  }
  return context
}
