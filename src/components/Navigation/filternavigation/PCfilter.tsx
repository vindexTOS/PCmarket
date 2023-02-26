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
    linkDiv: `bg-white z-50 absolute border-[1px] w-[220px] h-[90px] rounded-[12px] boxShaddow flex flex-col px-2 max_sm:mt-[8rem] mt-[10.6rem] `,
    link: `w-[100%] hover:bg-gray-300 p-[2px] px-2 cursor-pointer rounded-[12px] hover:text-blue-500 `,
  }
  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)

  const routeName = () => {
    if (location.pathname === '/desktop') {
      return lang ? 'All' : 'ყველა'
    } else if (location.pathname === '/desktop/used-pc') {
      return lang ? 'Used Pc' : 'მეორადი'
    } else if (location.pathname === '/desktop/new-pc') {
      return lang ? 'New Pc' : 'ახალი'
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
              location.pathname === '/desktop' ? 'bg-gray-300' : ''
            } `}
            to="/desktop"
          >
            {lang ? 'All' : 'ყველა'}
          </Link>

          <Link
            className={`${style.link}${
              location.pathname === '/desktop/used-pc' ? 'bg-gray-300' : ''
            } `}
            to="desktop/used-pc"
          >
            {lang ? 'Used Pc' : 'მეორადი'}
          </Link>
          <Link
            className={`${style.link}${
              location.pathname === '/desktop/new-pc' ? 'bg-gray-300' : ''
            } `}
            to="desktop/new-pc"
          >
            {lang ? 'New Pc' : 'ახალი'}
          </Link>
        </div>
      )}
    </div>
  )
}

export default PCfilter
