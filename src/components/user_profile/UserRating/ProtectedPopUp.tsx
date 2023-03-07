import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import AllRatingsPage from './AllRatingsPage'
type ProtectedProp = {
  userId: string
}
const ProtectedPopUp: FC<ProtectedProp> = ({ userId }): JSX.Element => {
  const { lang } = UseFormContext()
  const { popUprate, setPopUpRate } = UseProfileContext()
  const style = {
    mainDiv: ` w-[100vw] h-[100%] flex items-center justify-center bg-gray-300 absolute top-[5.7rem] bg-opacity-30 `,
    ratingDiv: `w-[80%] h-[80%]  bg-white boxShaddow rounded-[12px] flex flex-col items-center justify-center`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.ratingDiv}>
        {' '}
        <p>
          {lang
            ? 'authorise or register if you want to  add an revwie '
            : 'გაიარეთ ავტორიზაცია ან დარეგისტრიდით თუ გსურთ  შეფასების დამატება'}
        </p>
        <AllRatingsPage userId={userId} />
      </div>
    </div>
  )
}

export default ProtectedPopUp
