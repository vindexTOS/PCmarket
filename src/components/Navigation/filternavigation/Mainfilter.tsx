import React from 'react'
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
  } = UseProductContext()
  const style = {
    mainDiv: `w-[95%] h-[100px] bg-gray-100 rounded-[12px] flex items-center justify-end filtershaddow  gap-5`,
    dropdown: `w-[220px] h-[50px] rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer  `,
    iconDiv: ` flex gap-2 mr-3`,
    icon: `text-[1rem] text-gray-400 bg-gray-300 cursor-pointer rounded-[50%] w-[1.8rem] h-[1.8rem] flex items-center justify-center`,
    dropdownDiv: `bg-white z-50 absolute border-[1px] w-[220px] h-[120px] rounded-[12px] boxShaddow flex flex-col px-2   `,
    dropDownInnerDiv: `w-[100%] hover:bg-gray-300 p-[2px] px-2 cursor-pointer rounded-[12px] hover:text-blue-500`,
  }
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
        <m.p
          whileHover={{
            backgroundColor: '#ffd102',
            color: '#ffffff',
          }}
          transition={{ duration: 0.3 }}
          className={style.icon}
        >
          <BsGridFill />
        </m.p>
        <m.p
          whileHover={{
            backgroundColor: '#ffd102',
            color: '#ffffff',
          }}
          transition={{ duration: 0.3 }}
          className={style.icon}
        >
          <MdTableRows />
        </m.p>
      </div>
    </div>
  )
}

export default Mainfilter
