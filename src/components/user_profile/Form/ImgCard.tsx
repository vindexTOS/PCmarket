import React, { useState } from 'react'
import { Icons } from '../../../utils/data/Photos'
import { UseFormContext } from '../../context/FormContext'
import { TfiHandPointDown } from 'react-icons/tfi'
import { IoCameraReverseOutline } from 'react-icons/io5'
function ImgCard() {
  const {
    lang,
    image,
    imgUpload,
    imageHtml,
    imgRemove,
    handleMouseEnter,
    handleMouseLeave,
    isHovering,
    handleDragOver,
    handleDrop,
    innerHandleDrop,
  } = UseFormContext()
  const style = {
    title: `flex flex-col items-center justify-center w-[100%] h-[400px] bg-white rounded-[19px]    gap-7`,
    imgDrop: ` w-[90%] h-[150px] gap-2 border-2 border-dashed border-orange-400  rounded-[17px] flex flex-col items-center justify-center cursor-pointer`,
    imgSecUp: ` w-[120px]  h-[120px] max_sm:w-[85px] max_sm:h-[85px] max_sm:gap-1  gap-2 border-2 border-dashed border-orange-400 rounded-[17px] flex flex-col items-center justify-center cursor-pointer`,
    img: `w-[40px]`,
    uploadedImage: `w-[120px] h-[120px] rounded-[17px] max_sm:w-[85px] max_sm:h-[85px] hover:bg-gray-300 cursor-pointer `,
    imgOverLayHover: `w-[120px] h-[120px] rounded-[17px] max_sm:w-[85px] max_sm:h-[85px]  absolute z-10  flex items-center justify-center `,
  }
  // onDrop={(e) => innerHandleDrop(e, 2)}
  const i = !imageHtml[1] ? 1 : !imageHtml[2] ? 2 : !imageHtml[3] ? 3 : 4
  const id = !imageHtml[0]
    ? 'img'
    : !imageHtml[1]
    ? 'img1'
    : !imageHtml[2]
    ? 'img2'
    : !imageHtml[3]
    ? 'img3'
    : !imageHtml[4]
    ? 'img4'
    : 'img'
  return (
    <div className={style.title}>
      <div className="flex flex-row items-center justify-center gap-5  w-[90%] h-[3rem] bg-gray-100 rounded-[17px] max_lg:pl-2 ">
        <p className="w-[2rem] h-[2rem] bg-white rounded-[50%] flex items-center justify-center">
          <TfiHandPointDown className="text-orange-300 " />
        </p>
        <p className="text-[13px] pr-38   ">
          {lang
            ? 'More people will be interested in properly selected photos'
            : 'სწორად შერჩეული ფოტოებით მეტ ადამიანს დააინტერესებ.'}
        </p>
      </div>

      {imageHtml[0] == null ? (
        <label
          onDragOver={(e) => handleDragOver(e)}
          onDrop={handleDrop}
          className={style.imgDrop}
          htmlFor="img"
        >
          <img className={style.img} src={Icons.Picture} />
          <h1 className="font-bold text-[14px]">
            {lang ? 'Upload Photo' : 'სურათის ატვირთვა'}
          </h1>
          <p className="font-bold text-[10px] text-gray-400">
            {lang ? 'Max 5 photos' : 'მაქსიმუმ 5 ფოტო'}
          </p>
          <input
            multiple
            title={`${lang ? 'Add photo' : 'ფოტოს დამატება'}`}
            onChange={(e) => imgUpload(e, 0)}
            id="img"
            className="hidden"
            type="file"
          />
        </label>
      ) : (
        <div className="flex items-start justify-start w-[90%]   gap-5">
          <div className="flex flex-row flex-wrap max_sm:gap-3 gap-5">
            <label
              onDragOver={(e) => handleDragOver(e)}
              className={style.imgSecUp}
              onDrop={(e) => innerHandleDrop(e, i)}
              title={`${lang ? 'Add photo' : 'ფოტოს დამატება'}`}
              htmlFor={`${id}`}
            >
              <img className={style.img} src={Icons.Picture} />
            </label>
            {imageHtml.map((val, index) => {
              if (val) {
                return (
                  <div className="flex items-center justify-center">
                    <div
                      className={`${style.imgOverLayHover} ${
                        isHovering[index] ? 'blurCs cursor-pointer' : ''
                      }`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      <IoCameraReverseOutline
                        onClick={() => imgRemove(index)}
                        title={`${lang ? 'Remove' : 'წაშლა'}`}
                        className={`${
                          isHovering[index]
                            ? 'text-[60px] hover:text-[70px] hover:text-red-600 text-orange-600 '
                            : 'hidden'
                        }`}
                      />
                    </div>
                    <img
                      key={index}
                      className={style.uploadedImage}
                      src={val ? val : Icons.Picture}
                    />{' '}
                  </div>
                )
              }
            })}
          </div>
          <input
            multiple
            onChange={(e) => imgUpload(e, 1)}
            id="img1"
            className="hidden"
            type="file"
          />
          <input
            multiple
            onChange={(e) => imgUpload(e, 2)}
            id="img2"
            className="hidden"
            type="file"
          />
          <input
            multiple
            onChange={(e) => imgUpload(e, 3)}
            id="img3"
            className="hidden"
            type="file"
          />
          <input
            multiple
            onChange={(e) => imgUpload(e, 4)}
            id="img4"
            className="hidden"
            type="file"
          />
        </div>
      )}
    </div>
  )
}

export default ImgCard
