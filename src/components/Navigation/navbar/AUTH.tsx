import React from 'react'
import { Link } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'
import { UseFormContext } from '../../context/FormContext'
import { UseNavContext } from '../../context/NavContext'

const AUTH = () => {
  const { lang } = UseFormContext()
  const { setAuthPopUp, authPopUp, searchBarShow } = UseNavContext()
  return (
    <div
      onClick={() => setAuthPopUp(!authPopUp)}
      style={{ zIndex: '1000' }}
      className={` ${
        searchBarShow && 'hidden'
      } w-[160px] h-[35px]  max_md:w-[40px]  max_md:h-[40px]   flex  items-center justify-center gap-4 hover:outline-[3px] hover:outline-yellow-300  outline outline-2 outline-gray-300  rounded-[30px] cursor-pointer `}
    >
      <CiUser className="text-yellow-400 text-[1.2rem]  max_md:text-[1.4rem]" />
      <p className="text-gray-600 font-bold georgian mb-1  max_md:hidden">
        {lang ? 'Authorisation' : 'ავტორიზაცია'}
      </p>
    </div>
  )
}

export default AUTH
