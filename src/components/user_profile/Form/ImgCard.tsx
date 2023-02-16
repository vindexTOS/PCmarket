import React from 'react'
import { Icons } from '../../../utils/data/Photos'
import { UseMainContext } from '../../context/MainContext'
import { TfiHandPointDown } from 'react-icons/tfi'
function ImgCard() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { lang, image, imgUpload } = context
  const style = {
    title: `flex flex-col items-center justify-center w-[100%] h-[300px] bg-white rounded-[19px] gap-7`,
    imgDrop: ` w-[90%] h-[150px] gap-2 border-2 border-dashed border-orange-400 rounded-[17px] flex flex-col items-center justify-center cursor-pointer`,
    img: `w-[40px]`,
  }
  return (
    <div className={style.title}>
      <div className="flex flex-row items-center justify-center gap-2 w-[90%] h-[3rem] bg-gray-100 rounded-[17px]">
        <p className="w-[2rem] h-[2rem] bg-white rounded-[50%] flex items-center justify-center">
          <TfiHandPointDown className="text-orange-300" />
        </p>
        <p>
          {lang
            ? 'More people will be interested in properly selected photos'
            : 'სწორად შერჩეული ფოტოებით მეტ ადამიანს დააინტერესებ.'}
        </p>
      </div>
      <label className={style.imgDrop} htmlFor="img">
        <img className={style.img} src={Icons.Picture} />
        <h1 className="font-bold text-[14px]">
          {lang ? 'Upload Photo' : 'სურათის ატვირთვა'}
        </h1>
        <p className="font-bold text-[10px] text-gray-400">
          {lang ? 'Max 5 photos' : 'მაქსიმუმ 5 ფოტო'}
        </p>
      </label>
      <input onChange={imgUpload} id="img" className="hidden" type="file" />
      <input id="img" className="hidden" type="file" />
      <input id="img" className="hidden" type="file" />
      <input id="img" className="hidden" type="file" />
      <input id="img" className="hidden" type="file" />
    </div>
  )
}

export default ImgCard
