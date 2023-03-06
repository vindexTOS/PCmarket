import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import RatingStars from './RatingStars'

const UserRatingMain: FC = (): JSX.Element => {
  const { setRatingPopUp, setRatingComment } = UseProfileContext()

  const { userData, lang } = UseFormContext()

  const { imgUrl, userName } = userData[0] || {}

  const style = {
    mainDiv: ` w-[100vw] h-[100%] flex items-center justify-center bg-gray-300 absolute top-[5.7rem] bg-opacity-30 `,
    ratingDiv: `w-[80%] h-[80%]  bg-white boxShaddow rounded-[12px] flex flex-col items-center justify-center`,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.ratingDiv}>
        {/* <button onClick={() => setRatingPopUp(false)}>X</button> */}
        {/* <button onClick={() => console.log(userData)}>LOGINGLG</button> */}

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
            <button className="w-[80px] h-[35px] flex items-center justify-center bg-blue-400 text-white rounded-[12px]">
              {lang ? 'Send' : 'გაგზავნა'}
            </button>
          </div>
        </div>
        {/* <div>Other Ratings</div> */}
      </div>
    </div>
  )
}

export default UserRatingMain
