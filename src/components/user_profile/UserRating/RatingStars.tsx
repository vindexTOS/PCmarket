import React, { useState } from 'react'
import { BsStar } from 'react-icons/bs'
import { UseProfileContext } from '../../context/ProfileContext'

const RatingStars = () => {
  const { starRating, setStarRating } = UseProfileContext()
  const Stars = [
    { star: BsStar, scale: 1 },
    { star: BsStar, scale: 2 },
    { star: BsStar, scale: 3 },
    { star: BsStar, scale: 4 },
    { star: BsStar, scale: 5 },
  ]

  const [starColor, setStarColor] = useState<boolean[]>(
    new Array(Stars.length).fill(false),
  )

  // const Ratingfun = (index: number) => {
  //   let newStarColor = [...starColor]

  //   newStarColor[index] = true
  //   setStarColor(newStarColor)
  // }
  // const RatingfunRemove = (index: number) => {
  //   if (starRating <= 0) {
  //     setStarColor(new Array(Stars.length).fill(false))
  //   }
  // }
  const RaitinClickHandle = (val: number, index: number) => {
    setStarRating(val)
    setStarColor(new Array(index + 1).fill(true))
    console.log(starRating)
  }
  return (
    <div className="flex items-center justify-center gap-1">
      {/* {starRating} */}
      {Stars.map((val: any, index: number) => {
        return (
          <val.star
            onClick={() => RaitinClickHandle(val.scale, index)}
            className={`${
              starColor[index] ? 'text-yellow-400' : ''
            } text-[1rem] cursor-pointer hover:text-yellow-300`}
          />
        )
      })}
    </div>
  )
}

export default RatingStars
