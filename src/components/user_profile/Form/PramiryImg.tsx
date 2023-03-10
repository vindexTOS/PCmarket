import React from 'react'
import { UseFormContext } from '../../context/FormContext'
import { Icons } from '../../../utils/data/Photos'
function PramiryImg() {
  const { imageHtml } = UseFormContext()
  const style = {
    imgDivWrapper: `  mb-[109.2rem] ml-[88rem] fixed flex justify-end items-start pr-[7.4rem] max_Xll:pr-[3.6rem] max_xl:hidden`,
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
