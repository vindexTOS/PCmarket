import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { MdCancel } from 'react-icons/md'
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
  userID: string
  docId: string
}

const UserNav: FC<NavProps> = ({
  imgUrl,
  userName,
  singleUser,
  userID,
  docId,
}): JSX.Element => {
  const { lang, userData, user, allUsers } = UseFormContext()
  const {
    reviewsData,
    popUprate,
    editOpen,
    setEditOpen,
    userNameUpdate,
    setUserNameUpdate,
    profileImgUpdate,
    profilePicHtmlUpdate,
    editProfile,
  } = UseProfileContext()
  const [showNum, setShowNum] = React.useState<boolean>(false)

  const [hoverImg, setHoverImg] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const style = {
    navDiv: `w-[100%] h-[250px] mt-1 bg-white flex items-center justify-between px-40 max_md2:flex-col max_md2:h-[320px]  max_md2:pb-5`,
    imgNameDiv: `flex flex-col items-start justify-center max_md2:ml-20   w-[300px] h-[240px] gap-5 `,
    img: `w-[100px] h-[100px] rounded-[50%]  max_md2:w-[70px]  max_md2:h-[70px]`,
    name: `text-[2rem] text-gray-400`,
    contactDiv: `flex w-[200px] justify-between`,
    phoneDiv: `flex  items-center max_xl:p-0 gap-3 border-[1px] py-1 px-2 w-[12rem] h-[3rem]  rounded-[8px] hover:bg-gray-200 cursor-pointer`,
    popUpMain: `w-[100vw] h-[100vh] mt-[17rem] right-0 bg-gray-100 bg-opacity-50 absolute z-50  flex items-center justify-center`,
    popUpInner: ` flex flex-col items-center justify-between py-10 bg-white boxShaddow w-[400px] h-[300px]  rounded-[30px] max_ms:w-[300px]`,
    popUpbtn: `text-black flex items-center justify-between gap-5`,
    popUpButton: `w-[9rem] h-[2.4rem] rounded-[30px] text-white font-bold   `,
    editImgNameDiv: `flex flex-col gap-5 items-center justify-center `,
    editImg: `w-[70px] h-[70px] rounded-[50%] cursor-pointer`,
    editHeader: `w-[12rem]  h-[2rem] outline outline-2  flex items-center justify-center text-gray-400 rounded-[20px]`,
  }
  const { UserProfileMainId } = useParams()
  const UserEditCheck = UserProfileMainId === user?.uid
  if (singleUser) {
    return (
      <div className={style.navDiv}>
        <div className={style.imgNameDiv}>
          <div className="flex items-center justify-center gap-3">
            <img className={style.img} src={imgUrl} />
            <div className={style.name}>
              <h1>{userName}</h1>
            </div>
          </div>
          {UserEditCheck && (
            <button
              onClick={() => setEditOpen(!editOpen)}
              className="w-[10rem] h-[2.3rem] bg-yellow-400 hover:bg-yellow-300 text-white rounded-[30px]  max_md2:w-[14rem]"
            >
              {lang ? 'Edit Profile' : 'ედიტი'}
            </button>
          )}
        </div>
        {editOpen && (
          <div className={style.popUpMain}>
            <div className={style.popUpInner}>
              <div className={style.editImgNameDiv}>
                <label
                  htmlFor="img"
                  className={` flex items-center justify-center rounded-[50%] w-[80px] h-[80px]  bg-white ${
                    hoverImg && 'outline outline-4 outline-yellow-300 '
                  }`}
                >
                  <img
                    onMouseOver={() => setHoverImg(!hoverImg)}
                    onMouseLeave={() => setHoverImg(!hoverImg)}
                    className={style.editImg}
                    src={profilePicHtmlUpdate ? profilePicHtmlUpdate : imgUrl}
                  />
                </label>
                <input
                  type="file"
                  onChange={(e) => profileImgUpdate(e)}
                  className="hidden"
                  id="img"
                />
                <input
                  value={userNameUpdate}
                  onChange={(e) => setUserNameUpdate(e.target.value)}
                  type="text"
                  maxLength={10}
                  className={style.editHeader}
                  placeholder={`  ${userName}`}
                />
              </div>
              <div className={style.popUpbtn}>
                <button
                  onClick={() => setEditOpen(!editOpen)}
                  className={`${style.popUpButton} bg-red-400 hover:bg-red-500`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => editProfile(docId)}
                  className={`${style.popUpButton} bg-green-400 hover:bg-green-300`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
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
