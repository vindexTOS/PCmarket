import React, { useEffect, useState } from 'react'
import { UseProfileContext } from '../../context/ProfileContext'
import { BsStar } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
const UserRaitingStars = () => {
  const { reviewsData } = UseProfileContext()
  const { allUsers } = UseFormContext()
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
    userRatingFilter.reduce((a: number, b: number) => a + b) /
    userRatingFilter.length

  const [starCount, setStarCount] = useState<string[]>([])
  useEffect(() => {
    const count: string[] = []
    for (let i = 1; i <= Math.floor(userRatingAverageNumberCal); i++) {
      count.push('val')
    }
    setStarCount(count)
    console.log(starCount)
  }, [])
  return (
    <div>
      <button
        onClick={() => console.log(Math.floor(userRatingAverageNumberCal))}
      >
        LOGO
      </button>
      {starCount.map((val: any) => (
        <BsStar />
      ))}
    </div>
  )
}

export default UserRaitingStars
