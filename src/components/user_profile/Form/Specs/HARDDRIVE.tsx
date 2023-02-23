import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import { ssdCapacities } from '../../../context/ContextUtils'
function HARDDRIVE() {
  const { lang, register, laptopChack, getValues, setSpecs } = UseFormContext()
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
      {/* <h1 onClick={() => console.log(getValues('DISKTYPE'))}>LOG</h1> */}
      <h1>{lang ? 'Hard Drive Specs' : 'მყარი დისკის მონაცემები'}</h1>
      <div className="flex w-[90%]">
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'capacity' : 'მოცულობა'}
          </p>
          <select
            {...register('DISKCAPACITY')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {ssdCapacities.map((disk) => (
              <option>{disk}</option>
            ))}
          </select>
        </div>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Type' : 'ტიპი'}
          </p>
          <select
            {...register('DISKTYPE')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            <option>HDD</option>
            <option>SSD</option>
            <option>SSHD</option>
          </select>
        </div>
      </div>
      <div className={style.partCompanyWrapper}>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'platform' : 'პლატფორმა'}
          </p>
          <select
            {...register('DISKPLATFORM')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
            onChange={(e) => setSpecs(e.target.value)}
          >
            <option>PC</option>
            <option>Laptop</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default HARDDRIVE
