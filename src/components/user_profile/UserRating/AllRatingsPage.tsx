import React, { FC } from 'react'
import { UseProfileContext } from '../../context/ProfileContext'
type AllRatingProps = {
  userId?: string
}
const AllRatingsPage: FC<AllRatingProps> = ({ userId }) => {
  const { reviewsData } = UseProfileContext()
  return (
    <div>
      {/* <button onClick={() => console.log(reviewsData)}>iinfoo</button> */}
      {reviewsData
        .filter((val: any) => String(userId) === String(val.sellerUser))
        .map((val: any) => {
          return <div> {val.comment}</div>
        })}
    </div>
  )
}

export default AllRatingsPage
