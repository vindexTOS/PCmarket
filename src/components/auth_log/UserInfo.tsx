import React from 'react'
import { Utils } from '../../utils/data/Photos'
import { UseMainContext } from '../context/MainContext'
import { motion as m } from 'framer-motion'
function UserInfo() {
  const {
    setUserName,
    profilePicHtml,
    profileImg,
    userInfo,
    profilePic,
    userName,
  } = UseMainContext()

  const style = {
    form: `flex flex-col items-center w-[100%] h-[100vh] justify-center    `,
    cardDiv: `w-[400px] h-[400px] flex flex-col items-center justify-center bg-white rounded-[17px] boxShaddow`,
    wrapperDiv: `flex items-center justify-center flex-col gap-6 w-[100%]`,
    label: `bg-red-600 w-[120px] h-[120px] rounded-[50%] cursor-pointer flex items-center justify-center`,
    img: `w-[120px] h-[120px] rounded-[50%]`,
    textInput: `outline-0 border-[1px] rounded-[17px] h-[3.5rem] w-[80%]`,
    btn: `outline-0 border-[1px] rounded-[17px] h-[3.5rem] w-[80%] bg-green-400 text-[1.3rem] text-white text-bold hover:bg-green-300`,
    span: `w-[120px] h-[120px]  rounded-[50%] absolute bg-gray-300 opacity-0 flex items-center justify-center`,
    icon: `absolute w-[100px] h-[70px]`,
    warning: `absolute text-red-400 absolute text-[12px] mt-[9rem]`,
  }

  return (
    <form className={style.form} onSubmit={userInfo}>
      <div className={style.cardDiv}>
        <div className={style.wrapperDiv}>
          <label className={style.label} htmlFor="pfp">
            <m.img
              className={style.img}
              src={profilePicHtml ? profilePicHtml : Utils.userpfp}
            />
            <m.span whileHover={{ opacity: '0.3' }} className={style.span}>
              <img className={style.icon} src={Utils.camera} />
            </m.span>
          </label>
          <input
            id="pfp"
            className="hidden"
            type="file"
            onChange={(e) => profileImg(e)}
          />

          <input
            className={style.textInput}
            value={userName}
            placeholder=" User Name"
            type="text"
            maxLength={10}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userName.length >= 10 && (
            <p className={style.warning}>
              User Name Must Be Less Than 10 Letters !
            </p>
          )}
          <button className={style.btn} type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default UserInfo
