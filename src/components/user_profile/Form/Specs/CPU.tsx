import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import {
  AMDChips,
  IntelChips,
  laptopINTELCPU,
  laptopAMDCPU,
  CPUGHZ,
} from '../../../context/ContextUtils'
function CPU() {
  const {
    inputCPU,
    CPUcompany,
    lang,
    register,
    laptopChack,
    setInputCPU,
    setCPUModel,
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
      <h1>{lang ? 'CPU Specs' : 'აღწერა'}</h1>
      <div className="flex w-[90%]">
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'cores' : 'ბირთვების რაოდენობა'}
          </p>
          <select
            {...register('CORE')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
            <option>12</option>
            <option>16+</option>
          </select>
        </div>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Ghz' : 'ჰერცი'}
          </p>
          <select
            {...register('CPUGHZ')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {CPUGHZ.map((ghz) => (
              <option>{ghz}</option>
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
            {...register('CPUPLATFORM')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
            onChange={(e) => setSpecs(e.target.value)}
          >
            <option>PC</option>
            <option>Laptop</option>
          </select>
        </div>
        <div className={style.company}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'manufacturer' : 'მწარმოებელი'}
          </p>
          <select
            className="w-[5rem]  text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
            {...register('CPUCOMPANY')}
            onChange={(e) => setCPUModel(e.target.value)}
          >
            <option>Intel</option>
            <option>AMD</option>
          </select>
        </div>
      </div>

      <div className={style.bottomDiv}>
        {/* bottom div  */}
        {!inputCPU ? (
          <>
            {CPUcompany ? (
              <div className={style.parts}>
                <p className="text-[10px] text-gray-500  ">
                  {lang ? 'Model' : 'მოდელი'}
                </p>
                <select
                  {...register('chip')}
                  className="w-[6rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
                >
                  {laptopChack ? (
                    <>
                      {laptopINTELCPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {' '}
                      {IntelChips.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            ) : (
              <div className={style.parts}>
                <p className="text-[10px] text-gray-500  ">
                  {lang ? 'Model' : 'მოდელი'}
                </p>
                <select
                  {...register('chip')}
                  className="w-[8rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
                >
                  {laptopChack ? (
                    <>
                      {laptopAMDCPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {AMDChips.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            )}
          </>
        ) : (
          <input
            {...register('chip')}
            type="text"
            className={`${style.parts} w-[50%] h-[2.5rem]`}
            placeholder={lang ? ' Model Name' : ' მოდელის დასახელება'}
          />
        )}
        <p
          className="cursor-pointer h-[100%] w-[50%]    rounded-[9px]  flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500 "
          onClick={() => setInputCPU(!inputCPU)}
        >
          {lang ? 'Other' : 'სხვა'}
        </p>
      </div>
    </div>
  )
}

export default CPU
