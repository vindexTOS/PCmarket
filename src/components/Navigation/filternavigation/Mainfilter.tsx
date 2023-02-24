import React, { useEffect } from 'react'
import { BsGridFill } from 'react-icons/bs'
import { MdTableRows } from 'react-icons/md'
import { motion as m } from 'framer-motion'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { filterOptions } from '../../context/ContextUtils'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
function Mainfilter() {
  const { lang } = UseFormContext()
  const {
    filterDropDown,
    setFilterDropDown,
    filterVal,
    FilterTracker,
    gridLayOut,
    setGridLayOut,
  } = UseProductContext()
  const style = {
    mainDiv: `w-[95%] h-[100px] bg-gray-100 rounded-[12px] flex items-center justify-end filtershaddow  gap-5`,
    dropdown: `w-[220px] h-[50px] rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer  `,
    iconDiv: ` flex gap-2 mr-3`,
    iconGrid: `text-[1rem]  cursor-pointer rounded-[50%] w-[1.8rem] h-[1.8rem] flex items-center justify-center ${
      gridLayOut
        ? 'text-white bg-yellow-400'
        : ' text-gray-400 bg-gray-300 hover:bg-yellow-400 hover:text-white '
    }`,
    iconRow: `text-[1rem]   cursor-pointer rounded-[50%] w-[1.8rem] h-[1.8rem] flex items-center justify-center ${
      !gridLayOut
        ? 'text-white bg-yellow-400'
        : ' text-gray-400 bg-gray-300  hover:bg-yellow-400 hover:text-white'
    }`,
    dropdownDiv: `bg-white z-50 absolute border-[1px] w-[220px] h-[120px] rounded-[12px] boxShaddow flex flex-col px-2   `,
    dropDownInnerDiv: `w-[100%] hover:bg-gray-300 p-[2px] px-2 cursor-pointer rounded-[12px] hover:text-blue-500`,
  }
  useEffect(() => {
    console.log(gridLayOut)
  }, [gridLayOut])
  return (
    <div className={style.mainDiv}>
      <div>
        <div
          onClick={() => setFilterDropDown(!filterDropDown)}
          className={style.dropdown}
        >
          {' '}
          <div className="w-[100%] flex items-center justify-center">
            {lang ? filterVal.keyen : filterVal.keyge}
          </div>
          {!filterDropDown ? (
            <IoIosArrowDown className="mr-2 text-gray-400" />
          ) : (
            <IoIosArrowUp className="mr-2 text-gray-400" />
          )}
        </div>
        {filterDropDown && (
          <div className={style.dropdownDiv}>
            {filterOptions.map((val) => (
              <div
                key={val.keyen}
                onClick={() => FilterTracker(val.keyge, val.keyen)}
                className={style.dropDownInnerDiv}
              >
                {lang ? val.keyen : val.keyge}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={style.iconDiv}>
        <p
          onClick={() => setGridLayOut(!gridLayOut)}
          className={style.iconGrid}
        >
          <BsGridFill />
        </p>
        <p onClick={() => setGridLayOut(!gridLayOut)} className={style.iconRow}>
          <MdTableRows />
        </p>
      </div>
    </div>
  )
}

export default Mainfilter
