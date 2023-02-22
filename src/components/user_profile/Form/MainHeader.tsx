import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowDropright } from 'react-icons/io'
import { UseFormContext } from '../../context/FormContext'

function MainHeader() {
  const { lang, navigate } = UseFormContext()
  return (
    <div className=" ml-5">
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate('home')}
          type="button"
          className="text-[12px] text-gray-400"
        >
          {lang ? 'Home' : 'მთავარი'}
        </button>
        <IoMdArrowDropright className="text-gray-400 text-[12px] text-center" />
        <Link className="text-[12px] text-gray-400" to="/myproduct">
          {lang ? 'Add New Product' : 'განცხადების დამატება'}
        </Link>
      </div>
      <h1 className="font-bolder text-[1.5rem] ">
        {lang ? 'add new product' : 'განცხადების დამატება '}
      </h1>
    </div>
  )
}

export default MainHeader
