import React, { useState } from 'react'
import { UseFormContext } from '../context/FormContext'

function ProductCardRow({ val }: { val: any }) {
  const { lang, allUsers } = UseFormContext()

  const {
    title,
    price,
    priceCur,
    imgs,
    date,
    location,
    sallType,
    uid,
    description,
    category,
    priceNegotiation,
    id,
  } = val

  const user_name = allUsers?.filter((user: any) => {
    if (user.uid === uid) {
      return user.userName
    }
  })
  const [imgIndex, setImgIndex] = useState<number>(0)
  const slideIncrese = () => {
    if (imgIndex !== imgs.length - 1) {
      setImgIndex(imgIndex + 1)
    } else if (imgIndex == imgs.length - 1) {
      setImgIndex(0)
    }
    // console.log(imgs[imgIndex])
  }
  const slideDec = () => {
    if (imgIndex !== 0) {
      setImgIndex(imgIndex - 1)
    } else {
      setImgIndex(0)
    }
    // console.log(imgs[imgIndex])
  }
  const style = {
    mainDiv: `w-[90%] h-[400px] bg-white boxShaddow  flex   items-center jusitfy-between rounded-[5px] `,
    location: `ml-6 mt-1 gap-1 text-[12px]`,
    imgTextWrapper: `flex flex-col w-[400px] h-[100%]`,
    imgWrapper: `h-[100%] w-[400px] flex   items-center p-5`,
    img: `w-[400px] h-[300px] rounded-[5px]`,
    dateNameWrapper: `flex items-center   `,
    date: `flex gap-1 ml-[7rem] mb-2`,
    userDiv: `flex ml-6 mb-2 w-[5rem]   `,
    textWrapper: `h-[90%] w-[1450px]  flex flex-col gap-5`,
    header: ` text-[1.1rem] font-bold mt-5`,
    p: `text-gray-400 pr-5`,
    priceDiv: `h-[85%] w-[300px] border-l-2 flex flex-col gap-5 items-center justify-center`,
    price: `text-[2rem] text-white bg-green-400 rounded-[6px] px-5 `,
    nego: `text-[1.2rem] text-white  bg-green-300 rounded-[6px] px-5 `,
    selltype: `text-[2rem] text-white px-5  rounded-[6px] ${
      sallType == 'sale' ? 'bg-red-400' : 'bg-blue-400'
    }`,
    pCategory: `text-[1.7rem] text-white bg-yellow-400 px-3 rounded-[9px]  ml-10 mt-[18.2rem] absolute`,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.imgTextWrapper}>
        <p className={style.location}>
          <span className="text-gray-500">
            {lang ? 'Location:' : 'ადგილმდებარეობა:'}
          </span>
          {lang ? location.keyen : location.key}
        </p>
        <div className={style.imgWrapper}>
          <img className={style.img} src={imgs[imgIndex]} />
          <p className={style.pCategory}>{category}</p>
        </div>
        <div className={style.dateNameWrapper}>
          {' '}
          <div className={style.userDiv}>
            <p>{lang ? 'User' : 'ავტორი'}: </p>
            <p className="text-gray-400 ml-1"> {user_name[0]?.userName}</p>
          </div>
          <div className={style.date}>
            <p> {lang ? 'Date' : 'თარიღი'}:</p>
            <p className="text-gray-400">{`${date.slice(4, 16)}`}</p>
          </div>
        </div>
      </div>
      <div className={style.textWrapper}>
        <h1 className={style.header}>
          {title.length >= 80 ? `${title.slice(0, 80)}...` : title}
        </h1>
        <p className={style.p}>
          {description.slice(0, 860)}
          <span
            title={lang ? 'Open To Read More' : 'გახსენი მეტის გასაცნობად'}
            className="text-[1.2rem] hover:text-blue-400 cursor-pointer"
          >
            ...
          </span>
        </p>
      </div>
      <div className={style.priceDiv}>
        {priceNegotiation && priceNegotiation === 'negotiation' ? (
          <>
            <h1 className={style.nego}>
              {lang ? 'Price Negotiable ' : 'ფასი შეთანხმებით'}
            </h1>
          </>
        ) : (
          <>
            <h1 className={style.price}>
              {priceCur}
              {price}
            </h1>
            <h1 className={style.selltype}>
              {sallType == 'buy' ? 'Look for' : 'Sale'}
            </h1>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductCardRow
