import React from 'react'
import { UseMainContext } from '../../context/MainContext'
import { Icons } from '../../../utils/data/Photos'
function PramiryImg() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { imageHtml } = context
  const style = {
    imgDivWrapper: `  mb-[42rem] ml-[72rem] fixed flex justify-end items-start pr-[7.4rem] max_Xll:pr-[3.6rem] max_xl:hidden`,
    imgDiv: `   `,
    imgWrapper: `w-[250px] h-[290px] bg-white flex  items-center flex-col gap-5 justify-center pb-3  rounded-[19px]`,
    img: `w-[220px] h-[230px] rounded-[19px]`,
  }
  return (
    <>
      {imageHtml[0] && (
        <div className={style.imgDivWrapper}>
          <div className={style.imgDiv}>
            <div className={style.imgWrapper}>
              <img
                className={style.img}
                src={imageHtml ? imageHtml[0] : Icons.Picture}
              />
              <div className="w-[3rem] h-[2px] bg-black"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PramiryImg
