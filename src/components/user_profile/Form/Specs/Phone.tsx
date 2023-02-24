import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import {
  phoneCompanies,
  phoneCPUs,
  phoneCameraPixels,
  phoneScreenSizes,
} from '../../../context/ContextUtils'
function Phone() {
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
      <h1>{lang ? 'Phone specs' : 'მობილურის მონაცემები'}</h1>
      <div className="flex w-[90%]">
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Companies' : 'მწარმოებელი'}
          </p>
          <select
            {...register('PHONECOMPANY')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {phoneCompanies.map((com) => (
              <option>{com}</option>
            ))}
          </select>
        </div>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'CPU' : 'პროცესორი'}
          </p>
          <select
            {...register('PHONECPU')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {phoneCPUs.map((cpu) => (
              <option>{cpu}</option>
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
            {...register('PHONESCREEN')}
            className="w-[5rem] text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {phoneScreenSizes.map((inc) => (
              <option>{inc}</option>
            ))}
          </select>
        </div>
        <div className={style.company}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Camera' : 'კამერა'}
          </p>
          <select
            {...register('CAMERA')}
            className="w-[5rem]  text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            {phoneCameraPixels.map((px) => (
              <option>{px}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={style.bottomDiv}>
        <div className={style.parts}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'Model' : 'მობილურის მოდელი'}
          </p>
          <input
            {...register('PHONEMODEL')}
            className="w-[50%] text-[14px] flex items-center justify-center    outline-0   "
          />
        </div>
        <div className={style.company}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'RAM' : 'ოპერატიული'}
          </p>
          <select
            {...register('PHONERAM')}
            className="w-[5rem]  text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            <option>2GB</option>
            <option>3GB</option>
            <option>4GB</option>
            <option>5GB</option>
            <option>6GB</option>
            <option>8GB</option>
            <option>8GB+</option>
          </select>
        </div>
        <div className={style.company}>
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'ROM' : 'შიდა მეხსიერება'}
          </p>
          <select
            {...register('PHONERAM')}
            className="w-[5rem]  text-[14px] flex items-center justify-center cursor-pointer  outline-0   "
          >
            <option>8GB</option>
            <option>16GB</option>
            <option>32GB</option>
            <option>64GB</option>
            <option>128GB</option>
            <option>256GB</option>
            <option>256GB+</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Phone
