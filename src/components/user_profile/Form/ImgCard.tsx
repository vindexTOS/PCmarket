import React from 'react'
import { Icons } from '../../../utils/data/Photos'
import { UseMainContext } from '../../context/MainContext'
import { TfiHandPointDown } from 'react-icons/tfi'
function ImgCard() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { lang, image, imgUpload, imageHtml, imgRemove } = context
  const style = {
    title: `flex flex-col items-center justify-center w-[100%] h-[400px] bg-white rounded-[19px] gap-7`,
    imgDrop: ` w-[90%] h-[150px] gap-2 border-2 border-dashed border-orange-400 rounded-[17px] flex flex-col items-center justify-center cursor-pointer`,
    imgSecUp: ` w-[120px] h-[120px] gap-2 border-2 border-dashed border-orange-400 rounded-[17px] flex flex-col items-center justify-center cursor-pointer`,
    img: `w-[40px]`,
    uploadedImage: `w-[120px] h-[120px] rounded-[17px]`,
  }
  return (
    <div className={style.title}>
      <h1 onClick={() => console.log(imageHtml)}>FDSF</h1>
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
      {image[0] == null ? (
        <label className={style.imgDrop} htmlFor="img">
          <img className={style.img} src={Icons.Picture} />
          <h1 className="font-bold text-[14px]">
            {lang ? 'Upload Photo' : 'სურათის ატვირთვა'}
          </h1>
          <p className="font-bold text-[10px] text-gray-400">
            {lang ? 'Max 5 photos' : 'მაქსიმუმ 5 ფოტო'}
          </p>
          <input
            onChange={(e) => imgUpload(e, 0)}
            id="img"
            className="hidden"
            type="file"
          />
        </label>
      ) : (
        <div className="flex items-start justify-start w-[90%] gap-5">
          {' '}
          <div className="flex flex-row flex-wrap gap-5">
            <label
              className={style.imgSecUp}
              htmlFor={`${
                !imageHtml[0]
                  ? 'img'
                  : !imageHtml[1]
                  ? 'img1'
                  : !imageHtml[2]
                  ? 'img2'
                  : !imageHtml[3]
                  ? 'img3'
                  : !imageHtml[4]
                  ? 'img4'
                  : null
              }`}
            >
              <img className={style.img} src={Icons.Picture} />
            </label>
            {imageHtml.map((val, index) => {
              if (val) {
                return (
                  <img
                    onClick={() => imgRemove(index)}
                    key={index}
                    className={style.uploadedImage}
                    src={val ? val : Icons.Picture}
                  />
                )
              }
            })}
          </div>
          <input
            onChange={(e) => imgUpload(e, 1)}
            id="img1"
            className="hidden"
            type="file"
          />
          <input
            onChange={(e) => imgUpload(e, 2)}
            id="img2"
            className="hidden"
            type="file"
          />
          <input
            onChange={(e) => imgUpload(e, 3)}
            id="img3"
            className="hidden"
            type="file"
          />
          <input
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
