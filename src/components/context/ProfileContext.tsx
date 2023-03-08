import React, { useContext, createContext, useState, useEffect } from 'react'
import { UseFormContext } from './FormContext'
import { db, auth } from '../../components/firebase/firebaseconfig'
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore'
type Cell = {
  starRating: number
  setStarRating: React.Dispatch<React.SetStateAction<number>>
  ratingPopUp: boolean
  setRatingPopUp: React.Dispatch<React.SetStateAction<boolean>>
  setRatingComment: React.Dispatch<React.SetStateAction<string>>
  RateingSend: (userId: string) => void
  reviewsData: unknown | any
  popUprate: boolean
  setPopUpRate: React.Dispatch<React.SetStateAction<boolean>>
  deleteRating: (ID: string) => void

  editOpen: boolean
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ProfileContext = createContext<Cell | null>(null)

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user } = UseFormContext()
  //user raiting system
  // state for take values from stars
  const [starRating, setStarRating] = useState<number>(0)
  // rating pop up show
  const [ratingPopUp, setRatingPopUp] = useState<boolean>(false)
  // rating comment state
  const [ratingComment, setRatingComment] = useState<string>('')
  // getting data from input
  const RateingSend = async (userId: string) => {
    // sending both doc owners aka sellers uid and commentators aka reviwers uid for future comperesons and filters
    const { uid } = auth.currentUser as { uid: string }
    if (ratingComment !== '' && starRating > 0) {
      try {
        await addDoc(collection(db, 'user_reviews'), {
          sellerUser: userId,
          userCommentFrom: uid,
          rate: starRating,
          comment: ratingComment,
          date: Date(),
          timestamp: serverTimestamp(),
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  // pulling user data from firebase
  const [reviewsData, setReviewsData] = useState<unknown | any>()
  useEffect(() => {
    const q = query(collection(db, 'user_reviews'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querrySnapShot) => {
      let data: {}[] = []

      querrySnapShot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      setReviewsData(data)
    })
    return () => unsub()
  }, [user])
  /// pop up state for unregisterd users when they try to excses ratings
  const [popUprate, setPopUpRate] = useState<boolean>(false)

  // delete rating comment

  const deleteRating = async (ID: string) => {
    const docRef = doc(collection(db, `user_reviews`), ID)
    try {
      await deleteDoc(docRef)
      console.log('Document successfully deleted!')
    } catch (error) {
      console.error('Error removing documt: ', error)
    }
  }

  // profile edit
  // set profile pop up to open
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const editProfile = () => {
    const docRef = doc(collection(db, 'user_info'))
  }
  return (
    <ProfileContext.Provider
      value={{
        starRating,
        setStarRating,
        ratingPopUp,
        setRatingPopUp,
        setRatingComment,
        RateingSend,
        reviewsData,
        popUprate,
        setPopUpRate,
        deleteRating,
        editOpen,
        setEditOpen,
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
