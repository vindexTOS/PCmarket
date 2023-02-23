import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import {
  motherboardCompanies,
  motherboardSockets,
  ramGBArray,
} from '../../../context/ContextUtils'
function MOTHERBOARD() {
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
      <h1>{lang ? 'MotherBoard Specs' : 'დედა დაფის აღწერა'}</h1>
      <div className="flex w-[90%]">
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Manufacturer' : 'მწარმოებელი კომპანია'}
          </p>
          <select
            {...register('MBCOMPANY')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {motherboardCompanies.map((com) => (
              <option>{com}</option>
            ))}
          </select>
        </div>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Socket' : 'სოკეტი'}
          </p>
          <select
            {...register('MBSOCKET')}
            className="w-[8rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {motherboardSockets.map((socket) => (
              <option>{socket}</option>
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
            {...register('MBPLATFORM')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
            onChange={(e) => setSpecs(e.target.value)}
          >
            <option>PC</option>
            <option>Laptop</option>
          </select>
        </div>
        <div className={style.company}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Ram Slots' : 'ოპერატიულის სლოტები'}
          </p>
          <select
            {...register('MBRAMSLOTS')}
            className="w-[5rem]  text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8+</option>
          </select>
        </div>
      </div>

      <div className={style.bottomDiv}>{/* bottom div  */}</div>
    </div>
  )
}

export default MOTHERBOARD
