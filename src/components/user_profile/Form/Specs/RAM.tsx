import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import {
  ramDDRArray,
  ramMHZArray,
  ramGBArray,
} from '../../../context/ContextUtils'
function RAM() {
  const {
    lang,
    register,

    setSpecs,
  } = UseFormContext()
  const style = {
    mainDiv: `flex flex-col gap-5 max_md:border-2   items-center justify-center w-[100%] h-[320px]    bg-white rounded-[19px]`,
    partCompanyWrapper: `flex w-[90%]`,
    parts: `w-[50%]  rounded-[12px] border-2 flex flex-col items-center justify-center`,
    company: `w-[50%]  rounded-[12px] border-2 flex flex-col items-center justify-center`,
    CPUoption: `w-[50%] cursor-pointer  outline-0 border-l-2 max_md:border-2 max_md:w-[200%]`,
    bottomDiv: `flex w-[90%] justify-between `,
  }
  return (
    <div className={style.mainDiv}>
      <h1>{lang ? 'RAM Specs' : ' ოპერატიული მეხსიერების აღწერა'}</h1>
      <div className="flex w-[90%]">
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'RAM' : 'ოპერატიული მეხსიერება'}
          </p>
          <select
            {...register('RAMDDR')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {ramDDRArray.map((ddr) => (
              <option>{ddr}</option>
            ))}
          </select>
        </div>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Ghz' : 'ჰერცი'}
          </p>
          <select
            {...register('RAMMHZ')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {ramMHZArray.map((mhz) => (
              <option>{mhz}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={style.partCompanyWrapper}>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'platform' : 'პლატფორმა'}
          </p>
          <select
            {...register('RAMPLATFORM')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
            onChange={(e) => setSpecs(e.target.value)}
          >
            <option>PC</option>
            <option>Laptop</option>
          </select>
        </div>
        <div className={style.company}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'capacity' : 'მახსოვრობა'}
          </p>
          <select
            {...register('RAMGBS')}
            className="w-[5rem]  text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {ramGBArray.map((gb) => (
              <option>{gb}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={style.bottomDiv}>{/* bottom div  */}</div>
    </div>
  )
}

export default RAM
