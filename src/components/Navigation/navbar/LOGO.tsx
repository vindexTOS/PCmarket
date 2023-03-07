import React from 'react'
import { Link } from 'react-router-dom'

const LOGO = () => {
  return (
    <Link
      to="/"
      className="absolut bg-yellow-300 w-[150px] h-[35px] flex items-center justfiy-center max_md2:hidden rounded-[30px]"
    >
      <div className="flex w-[100%] h-[100%] items-center  justify-between ">
        <Link
          to="/"
          className="w-[70%] h-[80%] bg-white flex items-center justify-center rounded-[30px] ml-1"
        >
          <h1 className="text-[1.2rem]">PCmarket</h1>
        </Link>
        <h1 className=" mr-4 mb-1 text-white text-[1.2rem]">.ge</h1>
      </div>
    </Link>
  )
}

export default LOGO
