import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import {
  AMDGPU,
  nvidiaGPU,
  laptopNVIDiAGPU,
  laptopAMDGPU,
  GPUMHZ,
} from '../../../context/ContextUtils'
function GPU() {
  const {
    inputGPU,
    GPUcompany,
    lang,
    register,
    laptopChack,
    setInputGPU,
    setGPUModel,
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
      <h1>{lang ? 'GPU Specs' : 'ვიდეო ბარათის აღწერა'}</h1>
      <div className="flex w-[90%]">
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'RAM' : 'ოპერატიული მეხსიერება'}
          </p>
          <select
            {...register('GPURAM')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            <option>2Gb</option>
            <option>4Gb</option>
            <option>6Gb</option>
            <option>8Gb</option>
            <option>12Gb</option>
            <option>16Gb+</option>
          </select>
        </div>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Ghz' : 'ჰერცი'}
          </p>
          <select
            {...register('GPUMHZ')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {GPUMHZ.map((mhz) => (
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
            {...register('GPUPLATFORM')}
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
            {...register('GPUCOMPANY')}
            className="w-[5rem]  text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
            onChange={(e) => setGPUModel(e.target.value)}
          >
            <option>Nvidia</option>
            <option>AMD</option>
          </select>
        </div>
      </div>

      <div className={style.bottomDiv}>
        {/* bottom div  */}
        {inputGPU ? (
          <>
            {GPUcompany ? (
              <div className={style.parts}>
                <p className="text-[10px] text-gray-500  ">
                  {lang ? 'Model' : 'მოდელი'}
                </p>
                <select
                  {...register('GPU')}
                  className="w-[6rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
                >
                  {laptopChack ? (
                    <>
                      {laptopNVIDiAGPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {' '}
                      {nvidiaGPU.map((chip) => (
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
                  {...register('GPU')}
                  className="w-[8rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
                >
                  {laptopChack ? (
                    <>
                      {laptopAMDGPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {AMDGPU.map((chip) => (
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
            {...register('GPU')}
            type="text"
            className={`${style.parts} w-[50%] h-[2.5rem]`}
            placeholder={lang ? ' Model Name' : ' მოდელის დასახელება'}
          />
        )}
        <p
          className="cursor-pointer h-[100%] w-[50%]    rounded-[9px]  flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500 "
          onClick={() => setInputGPU(!inputGPU)}
        >
          {lang ? 'Other' : 'სხვა'}
        </p>
      </div>
    </div>
  )
}

export default GPU
