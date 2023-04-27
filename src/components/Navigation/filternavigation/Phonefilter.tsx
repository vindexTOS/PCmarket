import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'

function PCfilter() {
  const { lang } = UseFormContext()
  const { location, dropDownFilter } = UseProductContext()
  const style = {
    mainDiv: ` w-[220px]    h-[50px]   max_md:h-[40px]  max_sm:h-[40px]   rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer`,
    arrowDiv: `flex w-[100%] justify-end`,
    linkDiv: `bg-white py-5 z-50  absolute border-[1px] w-[220px] gap-2 h-[140px] rounded-[12px] boxShaddow flex flex-col px-2 mt-[11.8rem] `,
    link: `w-[100%] hover:bg-gray-300 p-[2px] px-2 cursor-pointer rounded-[12px] hover:text-blue-500 `,
  }
  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)

  const routeName = () => {
    if (location.pathname === '/phone') {
      return lang ? 'All' : 'ყველა'
    } else if (location.pathname === '/phone/used-phones') {
      return lang ? 'Used Phone' : 'მეორადი'
    } else if (location.pathname === '/phone/new-phones') {
      return lang ? 'New Phone' : 'ახალი'
    }
  }
  return (
    <div
      className={style.mainDiv}
      onClick={() => setsubCategoryDropDown(!subCategoryDropDown)}
    >
      <p className="ml-[4rem] text-[1.1rem]">{routeName()}</p>
      <div className={style.arrowDiv}>
        {!subCategoryDropDown ? (
          <IoIosArrowDown className="mr-2 text-gray-400" />
        ) : (
          <IoIosArrowUp className="mr-2 text-gray-400" />
        )}
      </div>
      {subCategoryDropDown && (
        <div className={style.linkDiv}>
          <Link
            className={`${style.link}${
              location.pathname === '/phone' ? 'bg-gray-300' : ''
            } `}
            to="/phone"
          >
            {lang ? 'All' : 'ყველა'}
          </Link>

          <Link
            className={`${style.link}${
              location.pathname === '/phone/used-phones' ? 'bg-gray-300' : ''
            } `}
            to="/phone/used-phones"
          >
            {lang ? 'Used Phone' : 'მეორადი'}
          </Link>
          <Link
            className={`${style.link}${
              location.pathname === '/phone/new-phones' ? 'bg-gray-300' : ''
            } `}
            to="/phone/new-phones"
          >
            {lang ? 'New Phone' : 'ახალი'}
          </Link>
        </div>
      )}
    </div>
  )
}

export default PCfilter
