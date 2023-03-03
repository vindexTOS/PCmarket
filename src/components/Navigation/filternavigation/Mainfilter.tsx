import React, { useEffect } from 'react'
import { BsGridFill } from 'react-icons/bs'
import { MdTableRows } from 'react-icons/md'
import { motion as m } from 'framer-motion'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { filterOptions } from '../../context/ContextUtils'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
import { FaBars } from 'react-icons/fa'
import DropdownSideNav from '../sidenavigation/DropdownSideNav'
import PCfilter from './PCfilter'
import Laptopfilter from './Laptopfilter'
import FilterPCSpecs from '../../../components/Products/subcategoryfilter/FIlterPCSpecs'
import { UseNavContext } from '../../context/NavContext'
import FilterLAPTOPSpecs from '../../Products/subcategoryfilter/FilterLAPTOPSpecs'
import FilterCOMPONENTSspecs from '../../Products/subcategoryfilter/FilterCOMPONENTSspecs'
import Componentsfilter from './Componentsfilter'
function Mainfilter() {
  const { lang } = UseFormContext()
  const {
    filterDropDown,
    setFilterDropDown,
    filterVal,
    FilterTracker,
    gridLayOut,
    setGridLayOut,

    PCsubCategory,
    LaptopsubCategory,
    ComponentsSubCategory,
    ComponentsCategory,
  } = UseProductContext()

  const {} = UseNavContext()
  const style = {
    mainDiv: ` ${'w-[95%]  max_sm:h-[200px] max_sm:flex-col h-[100px] mdxl:justify-end   justify-between flex items-center  max_md:w-[100%] max_md:ml-5 bg-gray-100 rounded-[12px]   filtershaddow max_sm:justify-center gap-5 max_sm:gap-2'} `,
    dropdown: `w-[220px] h-[50px] max_sm:w-[220px] max_sm:h-[40px]  max_sm:ml-8    max_md:w-[180px] max_md:h-[40px] rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer  `,
    iconDiv: ` flex gap-2 mr-3`,
    iconGrid: `text-[1rem] max_sm:hidden cursor-pointer rounded-[50%] w-[1.8rem] h-[1.8rem] flex items-center justify-center ${
      gridLayOut
        ? 'text-white bg-yellow-400'
        : ' text-gray-400 bg-gray-300 hover:bg-yellow-400 hover:text-white '
    }`,
    iconRow: `text-[1rem]   cursor-pointer rounded-[50%] w-[1.8rem] h-[1.8rem] flex items-center justify-center ${
      !gridLayOut
        ? 'text-white bg-yellow-400'
        : ' text-gray-400 bg-gray-300  hover:bg-yellow-400 hover:text-white'
    }`,
    dropdownAndBtnWrapper: `flex  items-center justify-center gap-5`,
    dropdownDiv: `bg-white max_sm:ml-8 z-50 absolute border-[1px]    w-[220px] h-[120px] rounded-[12px] boxShaddow flex flex-col px-2   `,
    dropDownInnerDiv: `w-[100%] hover:bg-gray-300 p-[2px] px-2 cursor-pointer rounded-[12px] hover:text-blue-500`,
    dropDownNavigationBars: `text-[1.9em] mx-2 text-yellow-500 mdxl:hidden cursor-pointer max_sm:mr-[18rem]`,
    dropDownFilter: `text-[2.8rem] text-yellow-500`,
  }

  return (
    <div className={style.mainDiv}>
      {/* <FaBars
        onClick={() => setDropDownSideNav(!dropDownSideNav)}
        className={style.dropDownNavigationBars}
      /> */}

      {/* {dropDownSideNav && <DropdownSideNav />} */}
      {/* <h1 onClick={() => console.log(filterState.RAM)}>log</h1> */}
      {LaptopsubCategory && <FilterLAPTOPSpecs />}
      {LaptopsubCategory && <Laptopfilter />}

      {/* pc filters` */}
      {PCsubCategory && <FilterPCSpecs />}
      {PCsubCategory && <PCfilter />}

      {/* components filter  */}
      {ComponentsCategory && <FilterCOMPONENTSspecs />}
      {ComponentsSubCategory && <Componentsfilter />}
      <div className={style.dropdownAndBtnWrapper}>
        <div>
          <div
            onClick={() => setFilterDropDown(!filterDropDown)}
            className={style.dropdown}
          >
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
          <p
            onClick={() => setGridLayOut(!gridLayOut)}
            className={`${style.iconRow} max_md:hidden`}
          >
            <MdTableRows />
          </p>
        </div>
      </div>
    </div>
  )
}

export default Mainfilter
