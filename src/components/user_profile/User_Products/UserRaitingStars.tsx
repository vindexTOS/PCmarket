import React, { useEffect, useState } from 'react'
import { UseProfileContext } from '../../context/ProfileContext'
import { BsStar } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
const UserRaitingStars = () => {
  const { reviewsData, ratingPopUp, setRatingPopUp } = UseProfileContext()

  const { allUsers, lang } = UseFormContext()
  const { UserProfileMainId } = useParams()
  const singleUserInfo = allUsers?.find(
    (val: any) => val.uid === UserProfileMainId,
  )
  const { uid } = singleUserInfo || {}
  // filtering correct user info based on uid if docs uid === sellers value
  // for the record  we are sending both sellers and raters UIDs in firebase for future refrences
  const userRatingFilter = reviewsData
    ?.filter((val: any) => val.sellerUser === uid)
    .map((val: any) => val.rate)

  const userRatingAverageNumberCal =
    userRatingFilter.length > 0
      ? userRatingFilter?.reduce((a: number, b: number) => a + b) /
        userRatingFilter.length
      : 0

  const [starCount, setStarCount] = useState<string[]>([])
  useEffect(() => {
    const count: string[] = []
    for (let i = 1; i <= Math.floor(userRatingAverageNumberCal); i++) {
      count.push('val')
    }
    setStarCount(count)
    console.log(starCount)
  }, [])
  const style = {
    mainDiv: `flex  flex-col items-center justify-center gap-2 `,
    starDiv: `flex  gap-5`,
    star: `text-[2rem] text-yellow-400`,
  }

  return (
    <div className={style.mainDiv}>
      {/* <button
        onClick={() => console.log(Math.floor(userRatingAverageNumberCal))}
      >
        LOGO
      </button> */}
      <div>
        <p className="text-gray-400 text-[1.2rem]">
          {lang ? 'Sellers Rating' : 'გამყიდველის შეფასება'}
        </p>
      </div>
      <div className={style.starDiv}>
        {starCount.map((val: any) => (
          <BsStar className={style.star} />
        ))}
      </div>
      <div
        className="flex gap-2 items-center justify-center cursor-pointer"
        onClick={() => setRatingPopUp(!ratingPopUp)}
      >
        <p className="text-[15px] underline text-gray-400  hover:text-blue-300">
          {' '}
          {lang ? 'Post Review' : 'დაწერე შეფასება'}
        </p>
        <p className="text-blue-400 text-[1.1rem] font-bold">
          {userRatingFilter.length}
        </p>
      </div>
    </div>
  )
}

export default UserRaitingStars
