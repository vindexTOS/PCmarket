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
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
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
  setUserNameUpdate: React.Dispatch<React.SetStateAction<string>>
  userNameUpdate: string
  profileImgUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  profilePicHtmlUpdate: string

  editProfile: (docId: string) => void

  dmPopUp: boolean
  setDmPopUp: React.Dispatch<React.SetStateAction<boolean>>

  DirectMessage: (uid: string) => void
  messageUser: any | unknown

  sendDm: (userId: string) => void

  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>

  resivedMessages: unknown | any
}
const ProfileContext = createContext<Cell | null>(null)

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user, allUsers } = UseFormContext()
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
  // make sure that if user does not changes user name old user name remaines
  const [oldName, setOldName] = useState<string>('')
  // old img
  const [oldImg, setOldImg] = useState<string>('')
  useEffect(() => {
    const singleUser = allUsers?.find((val: any) => val.uid === user?.uid)

    setOldName(singleUser?.userName)
    setOldImg(singleUser?.imgUrl)
  }, [allUsers])
  // set profile pop up to open
  const [editOpen, setEditOpen] = useState<boolean>(false)
  // name input for update
  const [userNameUpdate, setUserNameUpdate] = useState<string>(`${oldName}`)

  // img update state
  const [profilePicHtmlUpdate, setProfilePicHtmlUpdate] = useState<string>('')
  const [profilePicUpdate, setProfilePicUpdate] = useState<Blob | null>(null)
  const profileImgUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let newHtml = profilePicHtmlUpdate
      let newProfilePic = profilePicUpdate

      newHtml = URL.createObjectURL(e.target.files[0])
      newProfilePic = e.target.files[0]

      setProfilePicHtmlUpdate(newHtml)
      setProfilePicUpdate(newProfilePic)
    }
  }
  // make sure that if img is not change we keep old img

  const [oldImgUrl, setOldImgUrl] = useState<string>(`${oldImg}`)
  const editProfile = async (docId: string) => {
    try {
      if (profilePicUpdate !== null) {
        const storage = getStorage()
        const imgRef = ref(storage, `user_avatar${user?.uid}`)
        const docRef = doc(db, 'user_info', docId)
        await uploadBytes(imgRef, profilePicUpdate)
        const url = await getDownloadURL(imgRef)
        setOldImgUrl(url)
        await updateDoc(docRef, {
          imgUrl: url,
          userName: userNameUpdate,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  // message pop up
  const [dmPopUp, setDmPopUp] = useState<boolean>(false)
  // user info in direct messages
  const [messageUser, setMessageUser] = useState<any | unknown>()
  //function for DM
  const DirectMessage = (uid: string) => {
    setDmPopUp(!dmPopUp)
    const dmUser = allUsers?.find((val: any) => val.uid === uid)
    setMessageUser(dmUser)
  }
  // sending messages to firebase
  const [message, setMessage] = useState<string>('')
  const sendDm = async (userId: string) => {
    const { uid } = auth.currentUser as { uid: string }
    if (message !== '') {
      try {
        await addDoc(collection(db, 'user_messages'), {
          message: message,
          senderUid: uid,
          resiverUid: userId,
          date: Date(),
          timestamp: serverTimestamp(),
        })
        setMessage('')
      } catch (error) {
        console.error(error)
      }
    }
  }

  const [resivedMessages, setResivedMessages] = useState<unknown | any>()
  useEffect(() => {
    const q = query(collection(db, 'user_messages'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querrySnapShot) => {
      let data: {}[] = []

      querrySnapShot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      setResivedMessages(data)
    })
    return () => unsub()
  }, [user])
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
        userNameUpdate,
        setUserNameUpdate,
        profileImgUpdate,
        profilePicHtmlUpdate,
        editProfile,
        dmPopUp,
        setDmPopUp,
        DirectMessage,
        messageUser,
        sendDm,
        message,
        setMessage,
        resivedMessages,
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
