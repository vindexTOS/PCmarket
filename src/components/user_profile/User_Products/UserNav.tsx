import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
import { AiOutlineMessage } from 'react-icons/ai'
import { BsTelephoneFill } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UseProfileContext } from '../../context/ProfileContext'
import UserRaitingStars from './UserRaitingStars'
import ProtectedPopUp from '../UserRating/ProtectedPopUp'
type NavProps = {
  imgUrl: string
  userName: string
  singleUser: [{ number: string }]
}

const UserNav: FC<NavProps> = ({
  imgUrl,
  userName,
  singleUser,
}): JSX.Element => {
  const { lang, userData, user, allUsers } = UseFormContext()
  const { reviewsData, popUprate } = UseProfileContext()
  const [showNum, setShowNum] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const style = {
    navDiv: `w-[100%] h-[250px] mt-1 bg-white flex items-center justify-between px-40 max_md2:flex-col max_md2:h-[320px]  max_md2:pb-5`,
    imgNameDiv: `flex items-center justify-between w-[300px] h-[240px]   max_md2:justify-center  max_md2:gap-5 `,
    img: `w-[100px] h-[100px] rounded-[50%]  max_md2:w-[70px]  max_md2:h-[70px]`,
    name: `text-[2rem] text-gray-400`,
    contactDiv: `flex w-[200px] justify-between`,
    phoneDiv: `flex  items-center max_xl:p-0 gap-3 border-[1px] py-1 px-2 w-[12rem] h-[3rem]  rounded-[8px] hover:bg-gray-200 cursor-pointer`,
  }

  if (singleUser) {
    return (
      <div className={style.navDiv}>
        <div className={style.imgNameDiv}>
          <img className={style.img} src={imgUrl} />
          <h1 className={style.name}>{userName}</h1>
        </div>
        {/* <button onClick={() => console.log(singleUser)}>ON click</button> */}
        <div className="flex  flex-col max_smm:gap-1 gap-4">
          <div className="flex  gap-1">
            <div
              className={style.phoneDiv}
              onClick={() => setShowNum(!showNum)}
            >
              <BsTelephoneFill className="text-green-300 max_xl:text-[14px] ml-2 " />

              <div className="flex  items-center gap-1 ">
                {showNum ? (
                  <p className="max_xl:text-[11px]">
                    <span className="text-gray-400 max_xl:text-[10px]">
                      (+995){' '}
                    </span>
                    {singleUser[0].number.slice(0, 9)}
                  </p>
                ) : (
                  <p className="max_xl:text-[10px]">
                    {' '}
                    {singleUser[0].number.slice(0, 5)}** **
                  </p>
                )}
                <p
                  className={` w-[40px]  text-[12px] text-blue-400 ml-2 ${
                    showNum && 'hidden'
                  } `}
                >
                  {lang ? 'Show Number' : 'ნომრის ჩვენება'}
                </p>
              </div>
            </div>
            {/*  */}
            <div className="w-[3rem] h-[3rem]  bg-white border-[1px] rounded-[8px] flex items-center justify-center">
              <AiOutlineMessage className="text-[1.2rem]" />
            </div>
          </div>
          <UserRaitingStars />
        </div>
      </div>
    )
  } else {
    return <div>loading</div>
  }
}

export default UserNav
