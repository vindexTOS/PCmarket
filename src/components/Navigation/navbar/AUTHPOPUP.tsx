import React from 'react'
import { UseNavContext } from '../../context/NavContext'
import { MdCancel } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
const AUTHPOPUP = () => {
  const { setAuthPopUp, authPopUp } = UseNavContext()
  const { lang } = UseFormContext()
  const style = {
    mainDiv: `w-[100vw] h-[100vh] bg-gray-200 bg-opacity-40 z-50  right-10   top-[6rem] absolute flex items-center justify-center overflow-hidden`,
    midDiv: `w-[50%] h-[400px] bg-white  ml-20  rounded-[30px]  max_lg:w-[85%]  max_smm1:h-[300px]  `,
    linkDiv: `w-[100%] h-[85%] flex items-center justify-center gap-10`,
    link: `w-[11rem] h-[2.5rem] max_smm1:w-[7rem]  max_smm1:text-[14px] rounded-[30px]  text-gray-500  outline outline-2 outline-gray-200  hover:outline-[3px] hover:outline-yellow-300   text-[1.1rem] flex items-center justify-center `,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.midDiv}>
        {' '}
        <MdCancel
          onClick={() => setAuthPopUp(!authPopUp)}
          className=" text-red-500 hover:text-red-600 text-[2rem] cursor-pointer ml-2 mt-2 "
        />
        <div className={style.linkDiv}>
          <Link
            onClick={() => setAuthPopUp(!authPopUp)}
            className={style.link}
            to="/register"
          >
            {lang ? 'Register' : 'რეგისტრაცია'}
          </Link>
          <Link
            onClick={() => setAuthPopUp(!authPopUp)}
            className={style.link}
            to="/login"
          >
            {lang ? 'LogIn' : 'შესვლა'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AUTHPOPUP
