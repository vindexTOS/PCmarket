import React from 'react'
import { Link } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'
import { UseFormContext } from '../../context/FormContext'
const AUTH = () => {
  const { lang } = UseFormContext()
  return (
    <Link
      className="w-[160px] h-[35px] flex  items-center justify-center gap-4 hover:outline-[3px] hover:outline-yellow-300   outline outline-2 outline-gray-300  rounded-[30px] "
      to="/"
    >
      <CiUser className="text-yellow-400 text-[1.2rem]" />
      <p className="text-gray-600 font-bold georgian mb-1">
        {lang ? 'Authorisation' : 'ავტორიზაცია'}
      </p>
    </Link>
  )
}

export default AUTH
