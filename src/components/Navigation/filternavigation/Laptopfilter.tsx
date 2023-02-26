import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
function PCfilter() {
  const { lang } = UseFormContext()
  const { location } = UseProductContext()
  const style = {
    mainDiv: `w-[220px] h-[50px] max_md:w-[180px] max_md:h-[40px] rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer`,
    arrowDiv: `flex w-[100%] justify-end`,
    linkDiv: `bg-white z-50 absolute border-[1px] w-[220px] h-[90px] rounded-[12px] boxShaddow flex flex-col px-2 mt-[10.6rem] `,
    link: `w-[100%] hover:bg-gray-300 p-[2px] px-2 cursor-pointer rounded-[12px] hover:text-blue-500 `,
  }
  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)

  const routeName = () => {
    if (location.pathname === '/laptop') {
      return lang ? 'All' : 'ყველა'
    } else if (location.pathname === '/laptop/used-laptop') {
      return lang ? 'Used laptop' : 'მეორადი'
    } else if (location.pathname === '/laptop/new-laptop') {
      return lang ? 'New laptop' : 'ახალი'
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
              location.pathname === '/laptop' ? 'bg-gray-300' : ''
            } `}
            to="/laptop"
          >
            {lang ? 'All' : 'ყველა'}
          </Link>

          <Link
            className={`${style.link}${
              location.pathname === '/laptop/used-laptop' ? 'bg-gray-300' : ''
            } `}
            to="laptop/used-laptop"
          >
            {lang ? 'Used Laptop' : 'მეორადი'}
          </Link>
          <Link
            className={`${style.link}${
              location.pathname === '/laptop/new-laptop' ? 'bg-gray-300' : ''
            } `}
            to="laptop/new-laptop"
          >
            {lang ? 'New Laptop' : 'ახალი ლეპტოპი'}
          </Link>
        </div>
      )}
    </div>
  )
}

export default PCfilter
