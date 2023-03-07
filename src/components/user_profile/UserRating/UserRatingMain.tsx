import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import RatingStars from './RatingStars'
import AllRatingsPage from './AllRatingsPage'
type UseRatingProps = {
  userId?: string
}
const UserRatingMain: FC<UseRatingProps> = ({ userId }): JSX.Element => {
  const { setRatingPopUp, setRatingComment, RateingSend } = UseProfileContext()
  const { userData, lang } = UseFormContext()
  // this image is sign in users
  const { imgUrl, userName } = userData[0] || {}

  const style = {
    mainDiv: ` w-[100vw] h-[100%] flex items-center justify-center bg-gray-300 absolute top-[5.7rem] bg-opacity-30 `,
    ratingDiv: `w-[80%] h-[80%]  bg-white boxShaddow rounded-[12px] flex flex-col items-center justify-center`,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.ratingDiv}>
        <button
          className="w-[100%] flex ml-10 mt-2"
          onClick={() => setRatingPopUp(false)}
        >
          X
        </button>
        {/* <button onClick={() => console.log(userId)}>LOGINGLG</button> */}

        <div className="flex gap-3 items-center h-[100%]">
          <div className=" flex items-center justify-center  mb-[9rem] w-[60px] h-[60px] bg-yellow-300 rounded-[50%]  ">
            <img src={imgUrl} className="w-[50px] h-[50px] rounded-[50%]  " />
          </div>
          <div className="flex flex-col items-start gap-2">
            <RatingStars />
            <textarea
              placeholder={`${lang ? 'Rate The Seller' : 'შეაფასე გამყიდველი'}`}
              className="border-2 w-[500px] max-h-[150px] outline-0"
              onChange={(e) => setRatingComment(e.target.value)}
            ></textarea>
            <button
              onClick={() => RateingSend(userId || 's')}
              className="w-[80px] h-[35px] flex items-center justify-center bg-blue-400 text-white rounded-[12px]"
            >
              {lang ? 'Send' : 'გაგზავნა'}
            </button>
          </div>
        </div>
        {/* <div>Other Ratings</div> */}
        <AllRatingsPage userId={userId} />
      </div>
    </div>
  )
}

export default UserRatingMain
