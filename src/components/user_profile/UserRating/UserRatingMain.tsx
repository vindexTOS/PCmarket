import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import { MdCancel } from 'react-icons/md'
import { BsStar } from 'react-icons/bs'

import RatingStars from './RatingStars'
import AllRatingsPage from './AllRatingsPage'
import { useFormContext } from 'react-hook-form'
type UseRatingProps = {
  userId?: string
}
const UserRatingMain: FC<UseRatingProps> = ({ userId }): JSX.Element => {
  const {
    setRatingPopUp,
    setRatingComment,
    RateingSend,
    reviewsData,
    deleteRating,
  } = UseProfileContext()
  const { userData, lang, user } = UseFormContext()
  const { allUsers } = UseFormContext()
  // this image is sign in users
  const { imgUrl, userName } = userData[0] || {}
  // drop down comments
  const [dropDown, setDropDown] = useState<boolean>(false)
  const style = {
    mainDiv: ` w-[100vw] h-[100%] flex items-center justify-center bg-gray-300 absolute top-[5.7rem] bg-opacity-30 `,
    ratingDiv: `w-[80%] h-[80%]  bg-white boxShaddow rounded-[12px] flex flex-col items-center justify-center`,
  }
  const { UserProfileMainId } = useParams()

  const singleUserInfo = allUsers?.find(
    (val: any) => val.uid === UserProfileMainId,
  )
  const { uid } = singleUserInfo || {}
  const userRatingFilter = reviewsData
    ?.filter((val: any) => val.sellerUser === uid)
    .map((val: any) => val.rate)
  // checking if user already made an review on this profile
  //checking if the logged in users uid excists inside of the reviewsData array than checking if Location UserProfileMainId and sellerUser id are the sam
  // if this both are true we push alues inisde of the empty array and checking it in return if check.length is more than 0 if its more then 0 its gonna return true if its not it gonna return false
  const [revCheck, setRevCheck] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [stars, setStars] = useState<number>(0)
  const [id, setId] = useState<string>('')
  React.useEffect(() => {
    const reviewCheck = () => {
      let check = []
      for (let i = 0; i < reviewsData.length; i++) {
        if (
          userData[0].uid === reviewsData[i].userCommentFrom &&
          UserProfileMainId === reviewsData[i].sellerUser
        ) {
          check.push(reviewsData[i])
          setComment(reviewsData[i].comment)
          setStars(reviewsData[i].rate)
          setId(reviewsData[i].id)
        }
      }
      setRevCheck(check.length > 0)
      console.log(check.length)
    }
    reviewCheck()
  }, [reviewsData])

  // this checks if user is in its own profile

  const profileOwnerCheck = UserProfileMainId === userData[0].uid

  return (
    <div className={style.mainDiv}>
      <div className={style.ratingDiv}>
        <button
          className="w-[100%] flex ml-6 mt-3"
          onClick={() => setRatingPopUp(false)}
        >
          <MdCancel className="text-[1.5rem] text-red-500 hover:text-red-600" />
        </button>
        {/* <button onClick={() => console.log(revCheck, profileOwnerCheck)}>
          LOGINGLG
        </button> */}

        <div className="flex gap-3 items-center h-[100%]">
          <div className=" flex items-center justify-center  mb-[9rem] w-[60px] h-[60px] bg-yellow-300 rounded-[50%]  ">
            <img src={imgUrl} className="w-[50px] h-[50px] rounded-[50%]  " />
          </div>
          {!revCheck ? (
            !profileOwnerCheck && (
              <div className="flex flex-col items-start gap-2">
                <RatingStars />
                <textarea
                  placeholder={`${
                    lang ? 'Rate The Seller' : 'შეაფასე გამყიდველი'
                  }`}
                  className="border-2 w-[500px] max-h-[150px]  max_sm8:max-w-[300px] max_sm8:min-w-[200px]  max_smm:w-[120px] outline-0"
                  onChange={(e) => setRatingComment(e.target.value)}
                ></textarea>
                <button
                  onClick={() => RateingSend(userId || 's')}
                  className="w-[80px] h-[35px] flex items-center justify-center bg-blue-400 text-white rounded-[12px]"
                >
                  {lang ? 'Send' : 'გაგზავნა'}
                </button>
              </div>
            )
          ) : (
            <div className="flex flex-col items-start gap-2">
              {
                <p className="flex items-center justify-center  ml-2 gap-2">
                  {new Array(stars).fill('val').map((val: any) => {
                    return <BsStar className="text-[1rem] text-yellow-300" />
                  })}
                </p>
              }
              {/* <h1 onClick={() => console.log(reviewsData)}> tru sss</h1> */}
              <div className="border-2 w-[500px] max-h-[500px]  max_sm8:max-w-[300px] max_sm8:min-w-[200px]  max_smm:w-[120px] flex  py-3 outline-0 rounded-[30px]">
                <h1 className="ml-5 text-gray-500"> {comment}</h1>
              </div>
              <div
                className="w-[80px] h-[35px] flex items-center justify-center bg-red-500 text-white rounded-[12px] cursor-pointer"
                onClick={() => deleteRating(id)}
              >
                Delete
              </div>
            </div>
          )}
        </div>
        {/* <div>Other Ratings</div> */}
        <div className="mb-10 flex gap-1">
          <p className="text-gray-400  ">
            {lang ? 'Other Reviews ' : 'სხვა შეფასებები'}
          </p>{' '}
          <p className="text-blue-400 hover:text-blue-300">
            {userRatingFilter.length}
          </p>
        </div>
        <AllRatingsPage userId={userId} />
      </div>
    </div>
  )
}

export default UserRatingMain
