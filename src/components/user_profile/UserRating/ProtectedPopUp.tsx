import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import AllRatingsPage from './AllRatingsPage'
import { Link } from 'react-router-dom'
import { MdCancel } from 'react-icons/md'
type ProtectedProp = {
  userId: string
}
const ProtectedPopUp: FC<ProtectedProp> = ({ userId }): JSX.Element => {
  const { lang } = UseFormContext()
  const { popUprate, setRatingPopUp } = UseProfileContext()
  const style = {
    mainDiv: ` w-[100vw] h-[100%] flex items-center justify-center bg-gray-300 absolute top-[5.7rem] bg-opacity-30 `,
    ratingDiv: `w-[80%] h-[80%]  gap-10 bg-white boxShaddow rounded-[12px] flex flex-col items-center justify-center`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.ratingDiv}>
        <button
          className="w-[100%] flex ml-6 absolute ml-[22rem] mb-[32rem]"
          onClick={() => setRatingPopUp(false)}
        >
          <MdCancel className="text-[1.5rem] text-red-500 hover:text-red-600" />
        </button>
        <p className="text-gray-400">
          {lang ? (
            <div className="flex gap-2">
              <Link className="text-blue-400 hover:text-blue-300" to="/login">
                authorise
              </Link>{' '}
              or{' '}
              <Link
                className="text-blue-400  hover:text-blue-300"
                to="/register"
              >
                register{' '}
              </Link>
              if you want to add an review
            </div>
          ) : (
            <>
              {
                <div className="flex gap-2">
                  გაიარეთ
                  <Link
                    className="text-blue-400 hover:text-blue-300"
                    to="/login"
                  >
                    {' '}
                    ავტორიზაცია
                  </Link>
                  ან
                  <Link
                    className="text-blue-400  hover:text-blue-300"
                    to="/register"
                  >
                    დარეგისტრიდით
                  </Link>
                  თუ გსურთ რომ დაამატოთ შეფასება
                </div>
              }{' '}
            </>
          )}
        </p>
        <AllRatingsPage userId={userId} />
      </div>
    </div>
  )
}

export default ProtectedPopUp
